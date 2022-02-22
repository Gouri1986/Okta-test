import React, { Children } from "react"
import "./Modal.scss"

const Modal = props => {
  const { open, close, size, columnCount, modalTitle, isHeaderShow, isCloseIconShow = true, footer, children } =
    props
  return (
    <div className={`modal ${open === true ? "side-on-state" : "side-off-state"}`}>
      <div
        className={`modal-content animate-top ${
          size === "xs"
            ? `wd-xs`
            : size === "sm"
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
          {isCloseIconShow && (
            <>
              <button onClick={() => close()} className="modal-btn-close">
                &times;
              </button>
            </>
          )}

          <h3 className="mb-2 ml-10">{modalTitle}</h3>
        </div>
        {isHeaderShow && <div className="divider-grey mb-10"></div>}
        <div
          className={`modal-container ${
            columnCount <= 10 ? "" : columnCount > 11 ? "modal-container-h-75" : ""
          }`}
        >
          {children}
        </div>
        {footer}
      </div>
    </div>
  )
}

export default Modal
