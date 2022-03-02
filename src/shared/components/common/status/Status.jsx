import React from "react"

const Status = props => {
  const { withLabeled, status, passLabel, failLabel } = props
  return (
    <div
      className={`flex-r-jc-ac ${
        withLabeled ? `bg-light-${status === "PASS" ? "green" : "red"}-container` : null
      }  bdr-r-50 p-5 pl-10 pr-10`}
    >
      <div
        className={`mt-5 mb-5 mr-5 w-8 h-8 bdr-r-25 status-component-${
          status === "PASS" ? "success" : "fail"
        }`}
      ></div>
      {withLabeled ? (
        status === "PASS" ? (
          <p className="f-12">{passLabel}</p>
        ) : (
          <p className="f-12">{failLabel}</p>
        )
      ) : null}
    </div>
  )
}

export default Status
