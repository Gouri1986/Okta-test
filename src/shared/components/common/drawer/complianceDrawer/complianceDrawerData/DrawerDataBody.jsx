import React from "react"
import ResourceDataTable from "./ResourceDataTable"
import RegulationDataTable from "./RegulationDataTable"

const DrawerDataBody = props => {
  const { type } = props

  return (
    <div className="complaince-body  pt-0">
      {type === "Resources" ? (
        <ResourceDataTable {...props} />
      ) : type === "Regulation" ? (
        <RegulationDataTable {...props} />
      ) : null}
    </div>
  )
}

export default DrawerDataBody
