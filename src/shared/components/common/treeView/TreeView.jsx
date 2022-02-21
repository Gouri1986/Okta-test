import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./treeView.scss"
import axios from "axios"

const TreeView = props => {
  const { complainceDrawerRegulationData } = props

  // console.log(complainceDrawerRegulationData[0]?.regulationControls[0]?.Regulation)
  const regulation = complainceDrawerRegulationData[0]?.regulationControls[0]?.Regulation

  return (
    <div>
      {[...Array(regulation?.length)]?.map((item, i) => (
        <ul className="tree" key={i}>
          <li className="li-l1">
            <input
              type="checkbox"
              id={`l1_${i}`}
              // onClick={() => {
              //   regulationMap(complainceDrawerRegulationData[i])
              // }}
            />
            <label className="tree_label" for={`l1_${i}`}>
              {
              console.log(i)
              }
            </label>
            {/* <ul>
              {[regulationMapData[complainceDrawerRegulationData[i]]]?.map((item, i2) =>
                item?.map((item2, i3) => (
                  <li className={`${i}-li-l${i3}`}>
                    <input
                      type="checkbox"
                      id={`${i}-li-l${i3}`}
                      onClick={() => {
                        regulationMapDiscription(item2[`Control id`])
                        console.log(item2[`Control id`])
                      }}
                    />
                    <span className="flex-c flex-jc-sp-btn">
                      <span className="">
                        <label for={`${i}-li-l${i3}`} className="tree_label label_l2 ">
                          {item2[`Control id`]}
                        </label>
                      </span>
                      <small className="pl-5 pt-2">{item2.description}</small>
                    </span>
                    <ul>
                      {[regulationMapDataDiscription[item2[`Control id`]]]?.map((item3, index3) => (
                        <span
                          className="tree_label mt-20 pt-20 f-14 bg-tab p-10 bdr-r-5"
                          id={`l3_${i3}_${i2}`}
                        >
                          {item3?.[0].control_description}
                        </span>
                      ))}
                    </ul>
                  </li>
                ))
              )}
            </ul> */}
          </li>
        </ul>
      ))}
    </div>
  )
}

export default TreeView
