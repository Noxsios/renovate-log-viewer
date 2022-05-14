import { Code, Table, Tooltip } from "@mantine/core";
import FullscreenLogViewer from "../components/FullscreenLogViewer";
import { useMemo } from "react";

interface StaticTableProps {
  logs: RenovateLogs;
}

const StaticTable = (props: StaticTableProps) => {
  const rows = useMemo(
    () =>
      props.logs.map((log: any, index) => {
        return (
          <tr key={index}>
            <td>
              <Code>{index}</Code>
            </td>
            <td>
              <Tooltip label={log.time}>{new Date(log.time).toLocaleTimeString()}</Tooltip>
            </td>
            <td>{log.msg}</td>
            <td>
              <FullscreenLogViewer logs={log} title="JSON" />
            </td>
          </tr>
        );
      }),
    [props.logs]
  );

  return (
    <Table sx={{ backdropFilter: "blur(8px)" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Message</th>
          <th>Raw</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default StaticTable;
