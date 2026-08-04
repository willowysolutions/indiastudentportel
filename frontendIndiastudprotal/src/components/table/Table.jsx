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
  };

  return (
    <div className="w-full border rounded-xl bg-white shadow-sm overflow-hidden border-slate-200">
      {/* Header with title and filter */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
        <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
          {heading}
        </h2>
        <div className="relative">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filter emails..."
            className="pl-3 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
          />
        </div>
      </div>

      {/* Table content */}
      <div className="overflow-x-auto">
        <TableContainer sx={{ maxHeight: 600 }}>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress size={30} className="text-indigo-600" />
            </div>
          ) : data.length > 0 ? (
            <Table stickyHeader {...getTableProps()} className="w-full text-left border-collapse">
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id || Math.random()}
                    className="bg-slate-50/50"
                  >
                    {headerGroup.headers.map((column) => (
                      <TableCell
                        {...column.getHeaderProps()}
                        key={column.id}
                        align="left"
                        sx={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#64748b", // slate-500
                          borderBottom: "1px solid #e2e8f0",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f8fafc",
                          textTransform: "capitalize",
                          letterSpacing: "0.025em"
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
                      className="transition-colors hover:bg-slate-50 group"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {row.cells.map((cell) => (
                        <TableCell
                          {...cell.getCellProps()}
                          key={cell.column.id + "-" + row.id}
                          sx={{
                            padding: "12px 16px",
                            fontSize: "0.875rem",
                            color: "#334155", // slate-700
                            borderBottom: "1px solid #f1f5f9",
                            whiteSpace: "nowrap",
                            maxWidth: 300,
                          }}
                        >
                          {cell.column.id === "image" ? (
                            <img
                              src={cell.value}
                              alt="Row Image"
                              className="w-10 h-10 rounded-full object-cover border border-slate-200"
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
             <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
              <p className="text-sm">No results found.</p>
            </div>
          )}
        </TableContainer>
      </div>

      {/* Pagination */}
      <div className="border-t border-slate-100 bg-white">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              color: "#64748b",
              fontSize: "0.875rem",
            },
             ".MuiTablePagination-select": {
               color: "#334155",
             }
          }}
        />
      </div>
    </div>
  );
};

export default Tables;
