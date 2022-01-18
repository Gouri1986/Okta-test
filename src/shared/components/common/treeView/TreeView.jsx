import React from "react"
import "./treeView.scss"

import data from "./data.js"

const treeView = props => {
  
  return (
    <div>
      {data.map((item, i) => (
        <ul class="tree" key={i}>
          <li className="li-l1">
            <input type="checkbox" id={`l1_${i}`} />
            <label class="tree_label" for={`l1_${i}`}>
              {item?.l1}
            </label>
            <ul>
              {item?.l2_data.map((item, i2) => (
                <li className="li-l2">
                  <input type="checkbox" id={`l2_${i}_${i2}`} />
                  <label for={`l2_${i}_${i2}`} class="tree_label label_l2">
                    {item?.l2}
                  </label>
                  <ul>
                    {item?.l3_data.map((item, i3) => (
                      <li>
                        <span class="tree_label" id={`l3_${i}_${i2}_${i3}`}>{item?.l3}</span>
                      </li>
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

export default treeView
