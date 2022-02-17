import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import TreeView from "../../../treeView/TreeView"
import axios from "axios"

const ResourceDataTable = props => {
  const dispatch = useDispatch()
  const { complainceDrawerRegulationData } = useSelector(state => state.drawerReducer)
  const { user } = useSelector(state => state.userReducer)
  const [regulationMapData, setRegulationMapData] = useState([])

  const regulationMap = data => {
    axios
      .get(
        `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}get-regulationId-recs-oci-controls-regulation-map`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `${user}`
          },
          params: {
            regulation: data
          }
        }
      )
      .then(response => {
        setRegulationMapData({ ...regulationMapData, [data]: response.data.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <table className="compliance-resource-table wp-100 ">
        <tr
          className="flex-r wp-100 pos-sk t-0 bg-white pt-15 pb-15 z-10"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-jc-fs pl-20">Regulation</th>
        </tr>
        <div className="p-10 pl-20">
          <TreeView
            complainceDrawerRegulationData={complainceDrawerRegulationData}
            regulationMap={regulationMap}
            regulationMapData={regulationMapData}
          />
        </div>
      </table>
    </>
  )
}

export default ResourceDataTable
