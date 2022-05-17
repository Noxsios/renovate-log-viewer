import { Code, Table, Tooltip, TextInput, Container, Box, Select, Text, Pagination, useMantineTheme } from "@mantine/core";
import { Prism } from "@mantine/prism";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useExpanded, Column } from "react-table";
import { ChevronDown, ChevronRight, Search } from "tabler-icons-react";

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
      <TextInput
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} logs...`}
        size={"xl"}
        icon={<Search />}
      />
    </Container>
  );
}

const StaticTable = (props: StaticTableProps) => {
  const [data, setData] = useState<Object[]>([]);
  const tableRef = useRef(null);
  const theme = useMantineTheme();

  useEffect(() => {
    setData(
      props.logs.map((log: any, index) => {
        return {
          time: (
            <Tooltip label={log.time}>
              <Code sx={{ backgroundColor: theme.colors.gray[8], color: theme.colors.grape[2] }}>{new Date(log.time).toLocaleTimeString()}</Code>
            </Tooltip>
          ),
          msg: <Text sx={{ color: theme.colors.yellow[5] }}>{log.msg}</Text>,
          raw: log,
        };
      })
    );
  }, [props.logs]);

  const columns = useMemo(
    () =>
      [
        {
          Header: () => null,
          id: "expander",
          Cell: ({ row }) => {
            return (
              // Use Cell to render an expander for each row.
              // We can use the getToggleRowExpandedProps prop-getter
              // to build the expander.
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <ChevronDown color={theme.colors.green[5]} /> : <ChevronRight color={theme.colors.blue[5]} size={25} />}
              </span>
            );
          },
        },
        {
          Header: "Time",
          accessor: "time",
        },
        {
          Header: "Message",
          accessor: "msg",
        },
      ] as Column<Object>[],
    []
  );

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <Prism language="json">{JSON.stringify(data[row.index]["raw"], null, 2)}</Prism>,
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useGlobalFilter, useExpanded, usePagination);

  return (
    <Box mb={"5rem"} mx="xs">
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
      <Table {...getTableProps()} sx={{ backdropFilter: "blur(8px)" }} ref={tableRef}>
        <thead>
          {headerGroups.map((headerGroup, idx: number) => (
            <tr key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map((column, idx: number) => (
                <th key={column.getHeaderProps().key}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, idx: number) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => {
                    return <td key={cell.getCellProps().key}>{cell.render("Cell")}</td>;
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <Box sx={{ display: "flex", backdropFilter: "blur(4px)", justifyContent: "space-around" }}>
        <Text color={"dimmed"}>
          Page
          <strong style={{ margin: "0 0.5rem" }}>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Text>
        <Pagination
          page={pageIndex ? pageIndex + 1 : 1}
          onChange={(e) => {
            gotoPage(e - 1);
          }}
          total={pageOptions.length}
          withControls={true}
          radius="md"
          size="sm"
          withEdges
          siblings={3}
        />
        <Select
          value={String(pageSize)}
          onChange={(pageSize) => {
            setPageSize(Number(pageSize) || 10);
          }}
          data={[
            { label: "Show 10", value: "10" },
            { label: "Show 25", value: "25" },
            { label: "Show 50", value: "50" },
          ]}
          size={"xs"}
        />
      </Box>
    </Box>
  );
};

export default StaticTable;
