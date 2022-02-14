import React from "react"
import ComplianceViewButton from "../tableContainer/table/columnButtons/ComplianceViewButton"
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

  return (
    <div>
      {data?.map((item, i) => (
        <ul className="tree" key={i}>
          <li className="li-l1">
            <input type="checkbox" id={`l1_${i}`} />
            <label className="tree_label" for={`l1_${i}`}>
              {item?.l1}
            </label>
            <ul>
              {item?.l2_data.map((item, i2) => (
                <li className="li-l2">
                  <input type="checkbox" id={`l2_${i}_${i2}`} />
                  <span className="flex-r flex-jc-sp-btn">
                    <span className="">
                      <label for={`l2_${i}_${i2}`} className="tree_label label_l2 ">
                        {item?.l2}
                      </label>
                    </span>
                    <span className="">
                      <StatusComponet status={`PASS`} />
                    </span>
                    <span className="">
                      <ComplianceViewButton dark className="" />
                    </span>
                  </span>
                  <ul>
                    {item?.l3_data.map((item, i3) => (
                        <span className="tree_label" id={`l3_${i}_${i2}_${i3}`}>
                          {item?.l3}
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
