import React, { useState } from "react"
import ColumnSettingsIcon from "../columnSettings/ColumnSettings"
import Refresh from "../refresh/Refresh"
import Download from "../download/Download"
import { AddNewIcon, FilterIcon } from "./assets/index"

function TableSettings(props) {
  const { modalOnClick } = props
  return (
    <div className="flex-r-ac flex-jc-sp-btn p-25">
      <div className="flex-c">
        <div className="f-13 fw-500 fc-quaternary">Filter</div>
        <div className="bdr-buttom-primary-1 w-600">
          <FilterIcon />
        </div>
      </div>
      <div className="flex-r-ac flex-jc-sp-btn">
        <div className="table-add-icon mr-30 cp pt-7 pl-7 pr-7 bdr-r-6" onClick={modalOnClick}>
          <AddNewIcon />
        </div>
        <div className="mr-30">
          <ColumnSettingsIcon />
        </div>
        <div className="mr-30">
          <Refresh />
        </div>
        <div>
          <Download />
        </div>
      </div>
    </div>
  )
}

export default TableSettings
