import { useSelector } from "react-redux"
import TreeView from "../../../treeView/TreeView"
import Expand from '../asset/Expand'

const ResourceDataTable = props => {
  const { complainceDrawerRegulationData } = useSelector(state => state.drawerReducer)

 
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
          <TreeView complainceDrawerRegulationData={complainceDrawerRegulationData} ExpandIcon={Expand} {...props}/>
        </div>
      </table>
    </>
  )
}

export default ResourceDataTable
