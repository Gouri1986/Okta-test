import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import TreeView from "../../../treeView/TreeView"

const ResourceDataTable = props => {
  const { resourcesId, headerData } = props
  const dispatch = useDispatch()

  return (
    <>
      <table className="compliance-resource-table wp-100 ">
        <tr
          className="flex-r wp-100 pos-sk t-0 bg-white pt-15 pb-15"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-jc-fs pl-20">Regulation</th>
          {/* <th className="flex-3">Compliance Status</th>
          <th className="flex-1">JSON</th> */}
        </tr>
        <div className="p-10 pl-20">
          <TreeView />
        </div>
      </table>
    </>
  )
}

export default ResourceDataTable
