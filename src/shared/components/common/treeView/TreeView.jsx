import axios from "axios"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./treeView.scss"

const StatusComponet = props => {
  const { status } = props
  return (
    <div className={`flex-r p-5 bdr-r-5 status-bg-${status === "PASS" ? "success" : "fail"}`}>
      <div
        className={`w-12 h-12 bdr-r-6 mr-10 mt-1 status-component-${status === "PASS" ? "success" : "fail"}`}
      ></div>
      <span className="f-12">
        Complaint
        {/* {status} */}
      </span>
    </div>
  )
}

const TreeView = props => {
  const { data, status } = props

  const { complainceDrawerRegulationData } = useSelector(state => state.drawerReducer)
  const { user } = useSelector(state => state.userReducer)
  const [regulationMapData, setRegulationMapData] = useState([])

  const regulationMap = data => {
    axios
      .get(
        `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}get-regulationId-recs-oci-controls-regulation-map`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `${user}`
          },
          params: {
            regulation: data
          }
        }
      )
      .then(response => {
        setRegulationMapData([...regulationMapData, { [data]: response.data.data }])
      })
  }

  console.log("regulationMapData", regulationMapData)

  return (
    <div>
      {[...Array(complainceDrawerRegulationData.length)]?.map((item, i) => (
        <ul className="tree" key={i}>
          <li className="li-l1">
            <input
              type="checkbox"
              id={`l1_${i}`}
              onClick={() => {
                console.log(complainceDrawerRegulationData[i])
                regulationMap(complainceDrawerRegulationData[i])
              }}
            />
            <label className="tree_label" for={`l1_${i}`}>
              {complainceDrawerRegulationData[i]}
            </label>
            <ul>
              {[...Array(3)].map((item, i2) => (
                <li className="li-l2">
                  <input type="checkbox" id={`l2_${i}_${i2}`} />
                  <span className="flex-r flex-jc-sp-btn">
                    <span className="">
                      <label for={`l2_${i}_${i2}`} className="tree_label label_l2 ">
                        {item?.l2} data
                      </label>
                    </span>
                  </span>
                  <ul>
                    {[...Array(1)].map((item, i3) => (
                      <span className="tree_label mt-20 pt-20 f-14 bg-tab p-10 bdr-r-5" id={`l3_${i}_${i2}_${i3}`}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, ipsum.
                        Assumenda atque consequatur cumque excepturi maiores sed ipsa veritatis quae qui ea
                        amet nostrum maxime sit, totam, magnam, vero itaque!
                      </span>
                    ))}
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
