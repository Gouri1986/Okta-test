import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./treeView.scss"
import axios from "axios"
import { getSpacedDisplayName } from "../../../utils/table"

const TreeView = props => {
  const { complainceDrawerRegulationData, tableDetails } = props
  const discriptionData = tableDetails?.regulationControls?.discription
  const regulation = complainceDrawerRegulationData?.regulationControls

  const { user } = useSelector(state => state.userReducer)
  const [regulationMapDataDiscription, setRegulationMapDataDiscription] = useState([])

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
        <ul className="tree" key={i}>
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
                  <span className="flex-c flex-jc-sp-btn">
                    <span className="">
                      <label for={`${i}-li-l${i2}`} className="tree_label label_l2 ">
                        {item2?.[`Control id`]}
                      </label>
                    </span>
                    <small className="pl-5 pt-2">{item2.description}</small>
                  </span>
                  <ul>
                    <span className="tree_label mt-20 pt-20 f-14 bg-tab p-10 bdr-r-5" id={`l3_${i}_${i2}`}>
                      { colKey.map((item3, i3) => (
                       <>
                        <h4 className="pb-6">{getSpacedDisplayName(item3)}</h4>
                        <p className="pb-15">{regulationMapDataDiscription[item2[discriptionData?.params?.tableKey?.[0]]]?.[0]?.[item3]}</p>
                       </>
                      ))}
                    </span>
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
