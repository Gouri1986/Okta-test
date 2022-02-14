import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import Modal from "../../../modal/center/Modal"
import TreeView from "../../../treeView/TreeView"

const treeViewData = [
  {
    l1: "GDPR",
    l2_data: [
      {
        l2: "Art. 1 GDPR",
        l3_data: [{ l3: "TreeView data v1 l3" }]
      },
      {
        l2: "Art. 2 GDPR",
        l3_data: [{ l3: "TreeView data v1 l3" }]
      },
    ]
  }
]

const ResourceDataTable = props => {
  const { resourcesId, headerData } = props
  const dispatch = useDispatch()

  const { complainceDrawerJSONData } = useSelector(state => state.drawerReducer)

  return (
    <>
      <table className="compliance-resource-table wp-100 ">
        <tr
          className="flex-r wp-100 pos-sk t-0 bg-white pt-15 pb-15"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-2">Regulation</th>
          <th className="flex-3">Compliance Status</th>
          <th className="flex-1">JSON</th>
        </tr>
        {/* {resourcesId?.map((item, index) => (
          <tr className="flex-r wp-100 mt-20 mb-20 pl-15 pr-15">
            <td className="flex-3 flex-r-ac">
              <StatusComponet status={item.status} />
              <span className="f-14 lh-2.1 wp-85" style={{ wordBreak: "break-word" }}>
                {item.resourceId}
              </span>
            </td>
            <td className="flex-1" style={{ textAlign: "center" }}>
              <ComplianceViewButton
                dark
                onClick={() => {
                  dispatch(
                    getDrawerJSONData(
                      `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}get-resourceid-complaince-details`,
                      { resourceId: item?.resourceId, resource: headerData?.ociResourceType }
                    )
                  )
                  setOpenComplianceDrawerModal(true)
                }}
              />
            </td>
          </tr>
        ))} */}
        <TreeView data={treeViewData} status={`PASS`}/>
      </table>
    </>
  )
}

export default ResourceDataTable
