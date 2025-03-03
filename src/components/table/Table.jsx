import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTable, useGlobalFilter, usePagination } from "react-table";
// import Filter from "./Filter";

const Tables = ({ heading, DATA, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  // React Table instance
  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  // Rows per page state
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPageSize(10);
  }, [setPageSize]);

  // Handle pagination and rows per page changes
  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    // setRowsPerPage(newPageSize);
    // gotoPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Header with title and filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          {heading}
        </Typography>
        {/* <Filter filter={globalFilter} setFilter={setGlobalFilter} /> */}
        <TextField
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          size="small"
          sx={{ maxWidth: "300px" }}
        />
      </Box>

      {/* Table content */}
      <TableContainer sx={{ maxHeight: 400 }}>
        {loading ? (
          // Loading state
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : data.length > 0 ? (
          <Table stickyHeader {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.id || Math.random()}
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps()}
                      key={column.id}
                      align="left"
                      sx={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow
                    hover
                    {...row.getRowProps()}
                    key={row.id || row.original.id}
                  >
                    {row.cells.map((cell) => (
                      <TableCell
                        {...cell.getCellProps()}
                        key={cell.column.id + "-" + row.id}
                        sx={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          // overflow: "hidden",
                          maxWidth: 200,
                        }}
                      >
                        {cell.column.id === "image" ? (
                          <img
                            src={cell.value}
                            alt="Product"
                            style={{
                              width: 50,
                              height: "auto",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          // Empty state
          <Box sx={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="body1">No matching records found</Typography>
          </Box>
        )}
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: "1px solid #ddd" }}
      />
    </Paper>
  );
};

export default Tables;
