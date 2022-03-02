import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceActionButton from "../../../tableContainer/table/columnButtons/ComplianceActionButton"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import Modal from "../../../modal/center/Modal"
import View from "../asset/View"

const StatusComponet = props => {
  const { status } = props
  return (
    <div
      className={`flex-r-jc-ac bg-light-${
        status === "PASS" ? "green" : "red"
      }-container bdr-r-50 p-5 pl-10 pr-10`}
    >
      <div
        className={`mt-5 mb-5 mr-5 w-8 h-8 bdr-r-25 status-component-${
          status === "PASS" ? "success" : "fail"
        }`}
      ></div>
      {status === "PASS" ? <p className="f-12">Complaint</p> : <p className="f-12">Non Complaint</p>}
    </div>
  )
}

const ComplainceJSONModalFooter = props => {
  return (
    <div className="flex-r">
      <ComplianceActionButton dark type="copy" label="Copy" />
      <ComplianceActionButton label="Cancel" />
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
          <th className="">Complaince Status</th>
          <th>JSON</th>
        </tr>
        {resourcesId?.map((item, index) => (
          <tr className="flex-r flex-jc-sp-btn mt-20 mb-20 pl-15 pr-15">
            <td className="f-14 lh-2.1 pt-10 w-180" style={{ wordBreak: "break-word" }}>
              {item.resourceId}
            </td>
            <td className="w-170">
              <StatusComponet status={item.status} />
            </td>
            <td className="cp" style={{ textAlign: "center" }}>
              <ComplianceViewButton
                dark
                label="JSON"
                Icon={<View height="16" width="22" />}
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
          footer={ComplainceJSONModalFooter}
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
