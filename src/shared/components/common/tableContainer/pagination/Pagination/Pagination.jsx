import { useState, useRef } from "react"
import { Pagination } from "@mui/material"

import "./pagination.scss"
import JumpArrow from "./JumpArrow"

const PaginationComponent = props => {
  const { dataCount, page, rowsPerPage, setPage, setRowsPerPage, rowsPerPageData, jumpPageVisibility} = props
  const inputRef = useRef()
  const totalPage = Math.ceil(dataCount / rowsPerPage)
  const [jumpPage, setJumpPage] = useState()

  const jumpPageEvent = e => {
    e.preventDefault()
    if (jumpPage <= totalPage) {
      setPage(parseInt(jumpPage))
    } else {
     alert(`Please enter page number between 1 to ${totalPage}`)
    }
    inputRef.current.reset()
  }
  return (
    <>
      <div className="flex-r flex-jc-sp-btn">
        {/* Row per page dropdown compoent */}
        <div className="rows-per-page-box">
          <label>Rows per page</label>
          <select
            className="row-dropdown ml-15 "
            onChange={e => {
              setRowsPerPage(e.target.value)
              setPage(1)
            }}
          >
            {rowsPerPageData.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>
        {/* Pagination component */}
        <div className="pagination-box">
          <Pagination
            size="small"
            shape="rounded"
            page={page}
            count={totalPage}
            onChange={(event, val) => setPage(val)}
          />
        </div>
        {
          jumpPageVisibility === true && (
            <div className="jump-to-page-box">
            <form ref={inputRef}>
              {/* <span className="page-count mr-10 pr-10">{`${page} off ${totalPage}`}</span> */}
              <input
                className="page-count-input mr-2"
                type="text"
                placeholder="page no"
                onChange={e => setJumpPage(e.target.value)}
              />
              <span className="jumptopage-btn" onClick={jumpPageEvent}>
                <label className="mr-2">Jump to Page</label>
                <JumpArrow height={8} width={9} />
              </span>
              </form>
            </div>
          )
        }
       
      </div>
    </>
  )
}

export default PaginationComponent
