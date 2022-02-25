import React from "react"
import InlineStatusBarChart from "../../../charts/TableInlineBarStatus"
import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"

const ComplainceDetails = props => {
  const { data, tableDetails } = props

  const containerElement = tableDetails?.complainceDetails?.containerElement

  console.log(data?.descriptiveComplainceStatus?.[0].Fail)
  return (
    <div className="p-10">
      <div className="bg-blue-light-container bdr-r-10 pt-20 pl-10 pr-10 mt-25">
        {containerElement?.coloumnName?.map((item, i) => (
          <div className="pb-30">
            <h4 className="pb-5">{item}</h4>
            <p>{data?.[`${containerElement?.coloumnKey[i]}`]}</p>
          </div>
        ))}
      </div>
      <div className="pl-20 pr-20 mt-20 flex-r flex-jc-sp-btn">
        <div className="cp flex-r-jc-ac bg-secondary bdr-r-25 pt-5 pb-5 pr-5 wp-60">
          <InlineStatusBarChart
            value1={data?.descriptiveComplainceStatus?.[0].Pass}
            value2={data?.descriptiveComplainceStatus?.[0].Fail}
          />
        </div>
        <div className="cp">
          <ComplianceViewButton />
        </div>
      </div>
    </div>
  )
}

export default ComplainceDetails
