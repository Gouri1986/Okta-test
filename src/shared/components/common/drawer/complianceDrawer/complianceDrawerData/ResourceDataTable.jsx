import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getDrawerJSONData } from "../../../../../apis/drawer/drawer"
import ComplianceActionButton from "../../../tableContainer/table/columnButtons/ComplianceActionButton"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import Modal from "../../../modal/center/Modal"
import View from "../asset/View"
import Status from "../../../status/Status"

const JSONModalFooter = props => {
  const { cancel, copyData } = props

  const [copiedState, SetCopiedState] = useState(false)

  setTimeout(() => {
    SetCopiedState(false)
    console.log("Copy")
  }, 3.0 * 1000)

  return (
    <div className="flex-r flex-j-end">
      <div className="cp">
        <ComplianceActionButton
          dark
          type="copy"
          label={!copiedState ? `Copy` : `Copied`}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(copyData))
            SetCopiedState(true)
          }}
        />
      </div>
      <div className="cp ml-10">
        <ComplianceActionButton label="Cancel" onClick={() => cancel()} />
      </div>
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
          className="flex-r t-0 pos-sk bg-white p-15 pl-10 pr-10 text-left"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-3">Resources</th>
          <th className="flex-3 mr-20">Complaince Status</th>
          <th className="flex-1 ">JSON</th>
        </tr>
        {resourcesId?.map((item, index) => (
          <tr className="flex-r p-10 mt-20">
            <td className="flex-3 f-14 lh-2.1" style={{ wordBreak: "break-word" }}>
              {item?.resourceId}
            </td>
            <td className="flex-3 ">
              <div className="w-140 m-auto">
                <Status withLabeled status={item?.status} passLabel="Complaint" failLabel="Non Complaint" />
              </div>
            </td>
            <td className="flex-2" style={{ textAlign: "center" }}>
              <div className="m-auto wp-85 cp">
                <ComplianceViewButton
                  dark
                  label="JSON"
                  Icon={<View height="16" width="22" />}
                  onClick={() => {
                    let paramsKey = {
                      resource: data[tableDetails?.complainceStatus?.jsonView?.params?.tableKey?.[1]],
                      resourceId: item?.resourceId
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
              </div>
            </td>
          </tr>
        ))}
        <Modal
          //isAnimate
          isHeaderShow={false}
          open={openComplianceDrawerModal}
          close={() => {
            setOpenComplianceDrawerModal(false)
            setComplianceDrawerJSONDataState()
          }}
          size={`xs`} // sm, md, lg, xl
          footer={
            <JSONModalFooter
              cancel={() => {
                setOpenComplianceDrawerModal(false)
                setComplianceDrawerJSONDataState()
              }}
              copyData={complianceDrawerJSONDataState}
            />
          }
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
