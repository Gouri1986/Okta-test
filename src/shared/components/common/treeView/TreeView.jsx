import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./treeView.scss"
import axios from "axios"
import { getSpacedDisplayName } from "../../../utils/table"
import Modal from "../modal/center/Modal"

const TreeView = props => {
  const { complainceDrawerRegulationData, tableDetails, ExpandIcon, CollapseIcon } = props
  const discriptionData = tableDetails?.regulationControls?.discription
  const regulation = complainceDrawerRegulationData?.regulationControls

  const { user } = useSelector(state => state.userReducer)
  const [regulationMapDataDiscription, setRegulationMapDataDiscription] = useState([])
  const [openComplianceDrawerModal, setOpenComplianceDrawerModal] = useState(false)
  const [colKey, setColKey] = useState([])

  const regulationMapDiscription = (data, controlId) => {
    axios
      .get(`${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}${discriptionData?.apiEndpoint}`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": `${user}`
        },
        params: data
      })
      .then(response => {
        setColKey(Object.keys(response.data.data[0]))
        setRegulationMapDataDiscription({ ...regulationMapDataDiscription, [controlId]: response.data.data })
      })
  }

  return (
    <div>
      {regulation?.map((item, i) => (
        <ul className="tree pb-20 bdr-bottom-2" key={i}>
          <li className="li-l1">
            <input type="checkbox" id={`l1_${i}`} />
            <label className="tree_label" for={`l1_${i}`}>
              {item?.Regulation}
            </label>
            <ul>
              {item?.subRegulation?.map((item2, i2) => (
                <li className={`${i}-li-l${i2}`}>
                  <input
                    type="checkbox"
                    id={`${i}-li-l${i2}`}
                    onClick={() => {
                      let paramsKey = {}
                      paramsKey = {
                        [discriptionData?.params?.paramKey?.[0]]:
                          item2[discriptionData?.params?.tableKey?.[0]],
                        [discriptionData?.params?.paramKey?.[1]]: item[discriptionData?.params?.tableKey?.[1]]
                      }
                      regulationMapDiscription(paramsKey, item2[discriptionData?.params?.tableKey?.[0]])
                    }}
                  />
                  <span className="flex-c flex-jc-sp-btn ">
                    <span className="">
                      <label for={`${i}-li-l${i2}`} className="tree_label label_l2 ">
                        {item2?.[`Control id`]}
                      </label>
                    </span>
                    <small className="pl-5 pt-2">{item2.description}</small>
                  </span>
                  <ul>
                    <div className="tree_label mt-20 pt-20 f-14 bg-tab p-10 bdr-r-5" id={`l3_${i}_${i2}`}>
                      {colKey.map((item3, i3) => (
                        <>
                          <h4 className="pb-6">{getSpacedDisplayName(item3)}</h4>
                          <p className="pb-15">
                            {
                              regulationMapDataDiscription[
                                item2[discriptionData?.params?.tableKey?.[0]]
                              ]?.[0]?.[item3]
                            }
                          </p>
                        </>
                      ))}
                      <div
                        className="flex-r-ac flex-j-end cp"
                        onClick={() => {
                          setOpenComplianceDrawerModal(true)
                        }}
                      >
                        <ExpandIcon height="15" width="15" />
                      </div>
                      <Modal
                        open={openComplianceDrawerModal}
                        close={() => {
                          setOpenComplianceDrawerModal(false)
                        }}
                        size={`lg`} // sm, md, lg, xl
                        modalTitle={item2?.[`Control id`]}
                        isHeaderHide={true}
                        isCloseIconShow={false}
                        footer={
                          <div
                            className="flex-r-ac flex-j-end cp pt-10"
                            onClick={() => {
                              setOpenComplianceDrawerModal(false)
                            }}
                          >
                            <CollapseIcon height="20" width="20" />
                          </div>
                        }
                      >
                        <div
                          className="h-500 bdr-r-6 p-10"
                          style={{ backgroundColor: "rgba(199, 199, 199, 0.37)" }}
                        >
                          {colKey.map((item3, i3) => (
                            <>
                              <h4 className="pb-6">{getSpacedDisplayName(item3)}</h4>
                              <p className="pb-15">
                                {
                                  regulationMapDataDiscription[
                                    item2[discriptionData?.params?.tableKey?.[0]]
                                  ]?.[0]?.[item3]
                                }
                              </p>
                            </>
                          ))}
                        </div>
                      </Modal>
                    </div>
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default TreeView
