import React, { useState } from "react"
import ColumnSettingsIcon from "../columnSettings/ColumnSettings"
import Refresh from "../refresh/Refresh"
import Download from "../download/Download"
import { AddNewIcon, FilterIcon } from "./assets/index"

//Common components testing
import TreeView from "../../treeView/TreeView.jsx"
import { treeViewData } from "../../../db"
import RangeSlider from "../../inputs/range/rangeSlider"
import ModalRight from "../../modal/right/ModalRight"

function TableSettings() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex-r-ac flex-jc-sp-btn p-25">
      <div className="flex-c">
        <div className="f-13 fw-500 fc-quaternary">Filter</div>
        <div className="bdr-buttom-primary-1 w-600">
          <FilterIcon />
        </div>
      </div>
      <div className="flex-r-ac flex-jc-sp-btn">
        <div className="table-add-icon mr-30 cp pt-7 pl-7 pr-7 bdr-r-6" onClick={() => setOpen(!open)}>
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
      <ModalRight
        open={open}
        close={() => setOpen(false)}
        size="sm" // sm, md, lg, xl
        body={
          <>
            <div className="w-200">
              <RangeSlider
                marks={[
                  {
                    value: 0,
                    label: "Low"
                  },
                  {
                    value: 50,
                    label: "Medium"
                  },
                  {
                    value: 100,
                    label: "High"
                  }
                ]} // slider marks with value and label
                defaultValue={0} // default value
                handleFunction={function handleFunction(value) {
                  console.log(value)
                }} // handleFunction
              />
            </div>
            <TreeView data={treeViewData} />
          </>
        }
      />
    </div>
  )
}

export default TableSettings
