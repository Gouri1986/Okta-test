import React, { useEffect, useState } from "react"
import { Pagination } from "@mui/material"

import "./pagination.scss"

const PaginationComponent = props => {
  const { dataCount, page, rowsPerPage, setPage, setRowsPerPage } = props

  const totalPage = Math.ceil(dataCount / rowsPerPage)

  return (
    <>
      <div className="flex-r flex-jc-sp-btn">
        <div className="rows-per-page-box">
          <label>Rows per page</label>
          <select
            className="row-dropdown ml-15 "
            onChange={e => {
              setRowsPerPage(e.target.value)
              setPage(1)
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="pagination-box">
          <Pagination
            size="small"
            shape="rounded"
            count={totalPage}
            onChange={(event, val) => setPage(val)}
          />
        </div>
      </div>
    </>
  )
}

export default PaginationComponent
