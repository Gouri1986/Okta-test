import React from "react"
import ResourceDataTable from "./ResourceDataTable"
import RegulationDataTable from "./RegulationDataTable"
import ConsolidatedData from "./ConsolidatedData"

const DrawerDataBody = props => {
  const { type } = props

  return (
    <div className="complaince-body  pt-0">
      {type === "Resources" ? (
        <ResourceDataTable {...props} />
      ) : type === "Regulation" ? (
        <RegulationDataTable {...props} />
      ) : type === "ConsolidatedData" ? 
        <ConsolidatedData />
      : null
      }
    </div>
  )
}

export default DrawerDataBody
