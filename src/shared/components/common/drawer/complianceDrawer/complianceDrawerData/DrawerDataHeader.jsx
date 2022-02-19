import React from "react"
import "./complainceDrawerData.scss"
import LinkToExternal from "../asset/LinkToExternal"
import { kebabCaseDate } from "../../../../../utils/misc"
const DrawerDataHeader = props => {
  const { serviceType, tableTitle, headerData, headerColoumn, close } = props
  const createdDate = new Date(headerData.lastVerifiedDate * 1000)

  const serviceTypeUppercase = serviceType?.charAt(0)?.toUpperCase() + serviceType?.slice(1)

  return (
    <div className="complaince-header p-10 pt-20 pb-20">
      <p className="table-title f-24 fw-600">
        {tableTitle} <LinkToExternal className="cp" height="13" width="13" />
        <button onClick={() => close()} className="sidebar-btn mt-30">
          &times;
        </button>
      </p>
      {headerData.lastVerifiedDate && (
        <p className="f-14 fw-200">
          Generated on <span className="fw-500">{kebabCaseDate(headerData.lastVerifiedDate)}</span> at {""}
          <span className="fw-500"> {createdDate?.toLocaleTimeString()}</span>
        </p>
      )}
      <div className="flex-r flex-jc-sp-btn f-14 mt-15">
        <p className="fw-200">
          <span className="fw-500">{headerColoumn?.controlId}: </span>
          {headerData?.[`bc${serviceTypeUppercase}ControlItemId`]}
        </p>
        <p className="fw-200">
          <span className="fw-500">{headerColoumn?.projectId}: </span>
          {headerData?.[`${serviceType}ProjectId`]}
        </p>
      </div>
      <div className="flex-r flex-jc-sp-btn f-14 mt-15">
        <p className="fw-200">
          <span className="fw-500">{headerColoumn?.serviceType}: </span>
          {headerData?.[`${serviceType}ServiceType`]}
        </p>
        <p className="fw-200">
          <span className="fw-500">{headerColoumn?.resourceType}: </span>
          {headerData?.[`${serviceType}ResourceType`]}
        </p>
      </div>
    </div>
  )
}

export default DrawerDataHeader
