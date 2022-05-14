import { Code, Table, Tooltip, LoadingOverlay, Input, Container } from "@mantine/core";
import FullscreenLogViewer from "../components/FullscreenLogViewer";
import React, { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from "react-table";
import { Search } from "tabler-icons-react";

interface StaticTableProps {
  logs: RenovateLogs;
}

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Container size={"sm"} p={"md"}>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        size={"xl"}
        icon={<Search />}
      />
    </Container>
  );
}

const StaticTable = (props: StaticTableProps) => {
  const [data, setData] = useState<Object[]>([]);

  useEffect(() => {
    setData(
      props.logs.map((log: any, index) => {
        return {
          index: <Code>{index}</Code>,
          time: <Tooltip label={log.time}>{new Date(log.time).toLocaleTimeString()}</Tooltip>,
          msg: log.msg,
          raw: <FullscreenLogViewer logs={log} title="JSON" />,
        };
      })
    );
  }, [props.logs]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Message",
        accessor: "msg",
      },
      {
        Header: "Raw",
        accessor: "raw",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, state, prepareRow, preGlobalFilteredRows, setGlobalFilter } = useTable(
    { columns, data },
    useGlobalFilter
  );

  return (
    <>
      <LoadingOverlay visible={data.length === 0} />
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
      <Table {...getTableProps()} sx={{ backdropFilter: "blur(8px)" }}>
        <thead>
          {headerGroups.map((headerGroup, idx: number) => (
            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx: number) => (
                <th key={idx} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx: number) => {
            prepareRow(row);
            return (
              <tr key={idx} {...row.getRowProps()}>
                {row.cells.map((cell, idx: number) => {
                  return (
                    <td key={idx} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default StaticTable;
