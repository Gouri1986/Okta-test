import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import Modal from "../../../modal/center/Modal"

const StatusComponet = props => {
  const { status } = props
  return (
    <div
      className={`w-12 h-12 bdr-r-6 mr-10 status-component-${status === "PASS" ? "success" : "fail"}`}
    ></div>
  )
}

const ResourceDataTable = props => {
  const { resourcesId, headerData, datum, tableDetails, data } = props
  const dispatch = useDispatch()

  const { complainceDrawerJSONData } = useSelector(state => state.drawerReducer)
  const [openComplianceDrawerModal, setOpenComplianceDrawerModal] = useState(false)
  const [complianceDrawerJSONDataState, setComplianceDrawerJSONDataState] = useState()

  useEffect(() => {
    try {
      setComplianceDrawerJSONDataState(complainceDrawerJSONData[0][Object.keys(complainceDrawerJSONData[0])])
    } catch (error) {
      console.log(error)
    }
  }, [complainceDrawerJSONData])

  return (
    <>
      <table className="compliance-resource-table wp-100 ">
        <tr
          className="flex-r wp-100 pos-sk t-0 bg-white pt-15 pb-15"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-3">Resources</th>
          <th className="flex-1">JSON</th>
        </tr>
        {resourcesId?.map((item, index) => (
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
                  let paramsKey = {
                    resource: data[tableDetails?.complainceDetails?.jsonView?.params?.tableKey?.[1]],
                    resourceId: item.resourceId
                  }
                  dispatch(
                    getDrawerJSONData(
                      `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}${tableDetails?.complainceDetails?.jsonView?.apiEndpoint}`,
                      paramsKey
                    )
                  )
                  setOpenComplianceDrawerModal(true)
                }}
              />
            </td>
          </tr>
        ))}
        <Modal
          open={openComplianceDrawerModal}
          close={() => {
            setOpenComplianceDrawerModal(false)
            setComplianceDrawerJSONDataState()
          }}
          size={`xs`} // sm, md, lg, xl
          isHeaderShow={false}
        >
          <div className="h-500 bdr-r-6 p-10" style={{ backgroundColor: "rgba(199, 199, 199, 0.37)" }}>
            <code
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line"
              }}
            >
              {JSON.stringify(complianceDrawerJSONDataState, null, 4)}
            </code>
          </div>
        </Modal>
      </table>
    </>
  )
}

export default ResourceDataTable
