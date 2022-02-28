import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import Modal from "../../../modal/center/Modal"

const StatusComponet = props => {
  const { status } = props
  return (
    <div className="flex-r">
      <div
        className={`mt-5 mb-5 ml-10 mr-10 w-6 h-6 bdr-r-6 status-component-${
          status === "PASS" ? "success" : "fail"
        } `}
      ></div>
      {status === "PASS" ? <p className="f-12">Non Complaint</p> : <p className="f-12">Complaint</p>}
    </div>
  )
}

const ResourceDataTable = props => {
  const { resourcesId, tableDetails, data } = props
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
          className="flex-r flex-jc-sp-btn wp-100 t-0 pos-sk bg-white pt-15 pb-15 pl-10 pr-10"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th>Resources</th>
          <th>Complaince Status</th>
          <th>JSON</th>
        </tr>
        {resourcesId?.map((item, index) => (
          <tr className="flex-r flex-jc-sp-btn wp-100 mt-20 mb-20 pl-15 pr-15">
            <td className="">
              <span className="f-14 lh-2.1 wp-85" style={{ wordBreak: "break-word" }}>
                {item.resourceId}
              </span>
            </td>
            <td>
              <StatusComponet status={item.status} />
            </td>
            <td className="cp" style={{ textAlign: "center" }}>
              <ComplianceViewButton
                dark
                label="View JSON"
                onClick={() => {
                  let paramsKey = {
                    resource: data[tableDetails?.complainceStatus?.jsonView?.params?.tableKey?.[1]],
                    resourceId: item.resourceId
                  }
                  dispatch(
                    getDrawerJSONData(
                      `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}${tableDetails?.complainceStatus?.jsonView?.apiEndpoint}`,
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
          <div className="h-500 bdr-r-6 p-10">
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
