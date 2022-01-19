import React, { useState } from "react"
import "./ModalRight.scss"

const ModalRight = props => {
  const { open, close, size, body } = props

  return (
    <div
      className={`sidebar sidebar-animation ${open === true ? "side-on-state" : "side-off-state"} ${
        size === "sm"
          ? "wd-sm"
          : size === "md"
          ? "wd-md"
          : size === "lg"
          ? "wd-lg"
          : size === "xl"
          ? "wd-xl"
          : ""
      } `}
    >
      <button onClick={() => close()} className="sidebar-btn">
        &times;
      </button>
      <div className="sidebar-body">{body}</div>
    </div>
  )
}

export default ModalRight
