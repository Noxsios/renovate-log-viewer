import { Center, Tooltip, Grid } from "@mantine/core";
import FullscreenLogViewer from "../components/FullscreenLogViewer";
import { useMemo } from "react";
import { List, AutoSizer } from "react-virtualized";

interface DataTableProps {
  logs: RenovateLogs;
}

const DataTable = (props: DataTableProps) => {
  const list = useMemo(() => props.logs, [props.logs]);

  const rowRenderer = ({ index, key, style }: any) => {
    return (
      <Grid key={key} style={style} sx={{ backgroundColor: "#27282d" }} ml={"md"} mr={"xs"}>
        <Grid.Col span={1}>
          <Center>
            <Tooltip label={list[index].time}>{new Date(list[index].time).toLocaleTimeString("en-us", { hour12: false })}</Tooltip>
          </Center>
        </Grid.Col>

        <Grid.Col span={10}>
          <span style={{ textOverflow: "ellipsis" }}>{list[index].msg}</span>
        </Grid.Col>

        <Grid.Col span={1}>
          <Center>
            <FullscreenLogViewer logs={list[index]} title="JSON" />
          </Center>
        </Grid.Col>
      </Grid>
    );
  };

  return (
    <AutoSizer>
      {({ width }) => {
        return (
          <List height={750} width={width} rowCount={list.length} rowHeight={50} rowRenderer={rowRenderer} rowGetter={({ index }) => list[index]} />
        );
      }}
    </AutoSizer>
  );
};

export default DataTable;
