import React from "react"
import "./treeView.scss"


const treeView = props => {
  const { data } = props
  return (
    <div>
      {data?.map((item, i) => (
        <ul className="tree" key={i}>
          <li className="li-l1" key={i}>
            <input type="checkbox" id={`l1_${i}`} />
            <label className="tree_label" htmlFor={`l1_${i}`}>
              {item?.l1}
            </label>
            <ul>
              {item?.l2_data.map((item, i2) => (
                <li className="li-l2" key={i2}>
                  <input type="checkbox" id={`l2_${i}_${i2}`} />
                  <label htmlFor={`l2_${i}_${i2}`} className="tree_label label_l2">
                    {item?.l2}
                  </label>
                  <ul>
                    {item?.l3_data.map((item, i3) => (
                      <li key={i3}>
                        <span className="tree_label" id={`l3_${i}_${i2}_${i3}`}>{item?.l3}</span>
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
