import React from "react"
import ResourceDataTable from "./ResourceDataTable"

const DrawerDataBody = (props) => {
  const { resourcesId } = props
  return (
    <div className="complaince-body  pt-0">
      <ResourceDataTable resourcesId={resourcesId}/>
    </div>
  )
}

export default DrawerDataBody
