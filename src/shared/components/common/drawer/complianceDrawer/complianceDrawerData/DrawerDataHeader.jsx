import React from "react"
import "./complainceDrawerData.scss"
import LinkToExternal from "../asset/LinkToExternal"
import { kebabCaseDate } from "../../../../../utils/misc"
const DrawerDataHeader = props => {
  const { tableTitle, close, data, tableDetails } = props

  // const createdDate = new Date(headerData.lastVerifiedDate * 1000)

  const header = tableDetails?.dawerHeader?.coloumnName
  const headerKey = tableDetails?.dawerHeader?.coloumnKey

  return (
    <>
      <div className="complaince-header">
        <div className="f-24 fw-600 pt-10 pb-40 pl-10">
          {tableTitle}{" "}
          <span className="cp">
            <LinkToExternal className="cp" height="13" width="13" />
          </span>
          <button onClick={() => close()} className="complaince-sidebar-btn">
            &times;
          </button>
        </div>
        {/* {headerData.lastVerifiedDate && (
          <p className="f-14 fw-200">
            Generated on <span className="fw-500"></span> at {""}
            <span className="fw-500"> </span>
          </p>
        )} */}
        <div className="pb-10 pl-10 pr-10">
          <div className="flex-r flex-jc-sp-btn f-14 mt-15">
            <p className="fw-200">
              <span className="fw-500">{header[0]}: </span>
              {data[headerKey[0]]}
            </p>
            <p className="fw-200">
              <span className="fw-500">{header[1]}: </span>
              {data[headerKey[1]]}
            </p>
          </div>
          <div className="flex-r flex-jc-sp-btn f-14 mt-15">
            <p className="fw-200">
              <span className="fw-500">{header[2]}: </span>
              {data[headerKey[2]]}
            </p>
            <p className="fw-200">
              <span className="fw-500">{header[3]}: </span>
              {data[headerKey[3]]}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DrawerDataHeader
