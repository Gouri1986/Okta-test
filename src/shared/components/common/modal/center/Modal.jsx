import React from "react"
import "./Modal.scss"

const Modal = props => {
  const { open, close, size, body } = props

  return (
    <div className={`modal ${open === true ? "side-on-state" : "side-off-state"}`}>
      <div
        className={`modal-content animate-top  ${
          size === "sm"
            ? "wd-sm"
            : size === "md"
            ? "wd-md"
            : size === "lg"
            ? "wd-lg"
            : size === "xl"
            ? "wd-xl"
            : ""
        }`}
      >
        <button onClick={() => close()} className="modal-btn-close">
          &times;
        </button>
        <div className="container">{body}</div>
      </div>
    </div>
  )
}

export default Modal
