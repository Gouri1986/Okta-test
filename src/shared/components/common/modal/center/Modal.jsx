import React from "react"
import "./Modal.scss"

const Modal = props => {
  const { open, close, size, modalTitle, body } = props

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
        <button onClick={() => close()} className="modal-btn-close">
          &times;
        </button>
        <h3 className="mb-5">{modalTitle}</h3>
        <div className="modal-container">
          <p>{body}</p>
          {[...Array(35)].map(i => (
            <p key={i}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit officiis dolorum cum
              temporibus eum. Earum nihil nam harum eaque accusamus id. Corrupti obcaecati facere perspiciatis
              magnam mollitia inventore alias dolores.
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
