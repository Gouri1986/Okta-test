import React, { useEffect, useState } from "react"
import TablePagination from "@mui/material/TablePagination"

import "./pagination.css"

const Pagination = props => {
  const { dataCount, page, rowsPerPage, setPage, setRowsPerPage } = props

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value), 10)
    setPage(0)
  }
  return (
    <div>
      <TablePagination
        component="div"
        count={dataCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        // rowsPerPageOptions={[5, 10, 15, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default Pagination
