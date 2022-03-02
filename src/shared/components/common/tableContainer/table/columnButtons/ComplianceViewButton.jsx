import React from "react"
import { DoubleArrow } from "../assets"

const ComplianceViewButton = ({ label, Icon, dark, onClick }) => {
  return (
    <div
      className={
        dark
          ? "bg-black flex-r-jc-ac p-7 pl-15 pr-15  bdr-r-25"
          : "bg-secondary flex-r-jc-ac p-7 pl-15 pr-15 bdr-r-25 wp-100"
      }
      onClick={onClick}
    >
      <span className={` ${dark ? "fc-white" : "fc-secondary"} f-12 lh-2.1 fw-500 mr-8`}>{label}</span>
      {Icon ? Icon : <DoubleArrow />}
    </div>
  )
}

export default ComplianceViewButton
