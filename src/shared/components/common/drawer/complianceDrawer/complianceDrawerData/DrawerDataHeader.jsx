import React from "react"
import "./complainceDrawerData.scss"
import LinkToExternal from "../asset/LinkToExternal"
const DrawerDataHeader = props => {
  const { close, tableTitle, headerData } = props
  const createdDate = new Date(headerData.lastVerifiedDate * 1000)
  
  return (
    <div className="complaince-header p-10 pt-20 pb-20">
      <p className="table-title f-24 fw-600">
        {tableTitle} <LinkToExternal className='cp' height="13" width="13" />
        <button onClick={() => close()} className="sidebar-btn mt-30">
          &times;
        </button>
      </p>
      <p className="f-14 fw-200">
        Generated on <span className="fw-500">{`${(createdDate).getDate()}-${(createdDate).getMonth() + 1}-${(createdDate).getFullYear()}`}</span> at{" "}
        <span className="fw-500">{
          `${(createdDate).getHours()}:${(createdDate).getMinutes()}:${(createdDate).getSeconds()}`
        }</span>
      </p>
      <div className="flex-r flex-jc-sp-btn f-14 mt-15">
        <p className="fw-200">
          <span className="fw-500">Control ID: </span>
          {headerData?.controlId}
        </p>
        <p className="fw-200">
          <span className="fw-500">GCP Project ID: </span>638548674414
        </p>
      </div>
      <div className="flex-r flex-jc-sp-btn f-14 mt-15">
        <p className="fw-200">
          <span className="fw-500">Service Type: </span>
          {headerData?.ociServiceType}
        </p>
        <p className="fw-200">
          <span className="fw-500">Resource Type: </span>
          {headerData?.ociResourceType}
        </p>
      </div>
    </div>
  )
}

export default DrawerDataHeader
