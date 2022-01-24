import React, { Children } from "react"
import "./Modal.scss"

const Modal = props => {
  const { open, close, size, columnCount, modalTitle, children } = props
  return (
    <div className={`modal ${open === true ? "side-on-state" : "side-off-state"}`}>
      <div
        className={`modal-content animate-top ${
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
        <div className="modal-header">
          <button onClick={() => close()} className="modal-btn-close">
            &times;
          </button>
          <h3 className="mb-5">{modalTitle}</h3>
        </div>
        <div
          className={`modal-container ${
            columnCount <= 10
              ? ""
              : (
                  columnCount > 11? "modal-container-h-75" : ""
              )
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
