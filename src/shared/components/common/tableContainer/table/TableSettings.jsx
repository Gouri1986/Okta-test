import React from "react"
import ColumnSettingsIcon from "../columnSettings/ColumnSettings"
import Refresh from "../refresh/Refresh"
import Download from "../download/Download"
import {AddNewIcon} from "./assets"
import {FilterSettingIcon, FilterSearchIcon, FilterCloseIcon} from "../filter/assets";

function TableSettings(props) {
  const { modalOnClick } = props
  return (
    <div className="flex-c">
      <div className="flex-r-ac flex-jc-sp-btn pt-10 pb-10">
        <div className="fw-600 f-20 fc-primary">Security Control Criteria</div>
        <div className="lightblue-container flex-r flex-r-ac flex-jc-sp-btn pl-24 pr-24 pb-10 pt-10 cp" onClick={modalOnClick}>
          <AddNewIcon/>
          <p className="font-16 fw-600 fc-white pl-10">Add New</p>
        </div>
      </div>
      <div className="flex-r-ac flex-jc-sp-btn">
        <div className="flex-r wp-30 flex-r-ac flex-jc-sp-btn">
          <div className="flex-r flex-r-ac mr-50 wp-20">
            <p className="fc-tertiary font-14 fw-500 pr-10">Filter</p>
            <FilterSettingIcon />
          </div>
          <div className="flex-c wp-80">
            <div className="f-13 fw-500 fc-quaternary">Search</div>
            <div className="flex-r flex-jc-sp-btn bdr-buttom-primary-1 pt-5 pb-5 flex-align-items-end">
              <div className="bdr-tertiary-1 bdr-r-20 flex-r-ac pb-2 pt-2 pr-10 pl-10">
                <p className="pr-10 font-12 fw-400 fc-secondary">Filter Result</p>
                <FilterCloseIcon />
              </div>
                <FilterSearchIcon />
            </div>
            
          </div>
        </div>
        <div className="flex-r-ac flex-jc-sp-btn">
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
     
    </div>
  )
}

export default TableSettings
