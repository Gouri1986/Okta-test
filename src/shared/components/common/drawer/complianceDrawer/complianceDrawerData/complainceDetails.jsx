import React from "react"
import InlineStatusBarChart from "../../../charts/TableInlineBarStatus"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"
import { SeverityIcon } from "../../../tableContainer/table/assets/index"
import { DoubleArrow } from "../../../tableContainer/table/assets"

const SeverityCell = props => {
  const { label, labelKey, data } = props

  return (
    <div className="flex-r-jc-ac flex-jc-sp-btn">
      {label?.map((item, i) => (
        <div className="flex-r flex-jc-fs">
          <p className="fw-600">{item}</p>
          <div className="pl-5">
            <SeverityIcon level={data?.[labelKey[i]]} />
          </div>
        </div>
      ))}
    </div>
  )
}

const ComplainceDetails = props => {
  const { data, tableDetails, complainceStatusViewEvent, regulationViewEvent } = props

  const containerElement = tableDetails?.complainceDetails?.containerElement
  const outerElement = tableDetails?.complainceDetails?.outerElement

  return (
    <div className="p-10 mb-70">
      <div className="bg-blue-light-container bdr-r-10 pt-20 pl-10 pr-10 mt-25">
        {containerElement?.coloumnName?.map((item, i) => (
          <div className="pb-30">
            <h4 className="pb-5">{item}</h4>
            <p>{data?.[`${containerElement?.coloumnKey[i]}`]}</p>
          </div>
        ))}
      </div>
      <div className="pl-20 pr-20 mt-40 flex-r flex-jc-sp-btn">
        <div
          className="cp flex-r-jc-ac bg-secondary pt-5 pb-5 pr-5 wp-60 bdr-r-25"
          onClick={complainceStatusViewEvent}
        >
          <InlineStatusBarChart
            value1={data?.descriptiveComplainceStatus?.[0].Pass}
            value2={data?.descriptiveComplainceStatus?.[0].Fail}
          />
          <div className="ml-10 fw-600 f-14">
            {parseInt(
              (data?.descriptiveComplainceStatus?.[0]?.Pass /
                (data?.descriptiveComplainceStatus?.[0]?.Pass +
                  data?.descriptiveComplainceStatus?.[0]?.Fail)) *
                100
            )}
            %
          </div>
          <div className="pl-5 pr-5">
            <DoubleArrow />
          </div>
        </div>
        <div className="cp">
          <ComplianceViewButton label="View Regulation" onClick={regulationViewEvent} />
        </div>
      </div>
      <div className="mt-40 p-10">
        <h4>Severity:</h4>
        <SeverityCell
          label={outerElement?.Severity?.coloumnName}
          labelKey={outerElement?.Severity?.coloumnKey}
          data={data}
        />
      </div>
      <div className="mt-10 p-10 ">
        <div className="flex-r flex-jc-fs">
          <h4>{outerElement?.region?.coloumnName}: </h4> {data?.[outerElement?.region?.coloumnKey]}
        </div>
      </div>
    </div>
  )
}

export default ComplainceDetails
