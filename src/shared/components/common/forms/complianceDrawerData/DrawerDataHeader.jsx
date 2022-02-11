import React from "react"
import "./complainceDrawerData.scss"

const DrawerDataHeader = props => {
  const { close, tableTitle } = props
  return (
    <div className="complaince-header">
      <p className="table-title f-24 fw-600">
        {tableTitle}
        <button onClick={() => close()} className="sidebar-btn">
          &times;
        </button>
      </p>
      <p className="f-14 fw-200">Generated on <span className="fw-500">20-07-2021</span> at <span className="fw-500">10.30 AM</span></p>
      <div className="flex-r flex-jc-sp-btn f-14 mr-10 mt-15">
        <p className="fw-200"><span className="fw-500">Control ID: </span>4.2</p>
        <p className="fw-200"><span className="fw-500">GCP Project ID: </span> 638548674414</p>
      </div>
      <div className="flex-r flex-jc-sp-btn f-14 mr-50 mt-15 pb-20">
        <p className="fw-200"><span className="fw-500">Service Type: </span>VPC Network</p>
        <p className="fw-200"><span className="fw-500">Resource  Type: </span> Subnets</p>
      </div>
    </div>
  )
}

export default DrawerDataHeader
