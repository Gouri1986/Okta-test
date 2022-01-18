import React from "react"
import "./treeView.scss"

import data from "./data.js"

const treeView = props => {
  const { nth, level } = props

  console.log(data)
  const l1 = 2
  const l2 = 3
  const l3 = 5
  return (
    <div>
      {data.map((item, i) => (
        <ul class="tree" key={i}>
          <li class="tree_label_1">
            <input type="checkbox"  id={`c${i}`} />
            <label for={`c${i}`}>
              {item?.l1}
            </label>
            {item?.l2_data?.map((item2, i2) => (
              <ul>
                <li  class="tree_label_2">
                  <input type="checkbox"   id={`c${i2 + 1}`} />
                  <label for={`c${i2 + 1}`}>
                    {item2?.l2}
                  </label>
                  <ul>
                    {item2?.l3_data?.map((item3, i3) => (
                      <li class="tree_label_3">
                        <span>{item3?.l3}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ))}
          </li>
        </ul>
      ))}
    </div>
  )
}

export default treeView
