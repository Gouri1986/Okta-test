import ComplianceViewButton from "../../../tableContainer/table/columnButtons/ComplianceViewButton"

const StatusComponet = props => {


  const {status} = props;

  return <div className={`w-12 h-12 bdr-r-6 mr-10 status-component-${status==='PASS'?"success":"fail"}`}></div>
}

const ResourceDataTable = (props) => {

  const { resourcesId } = props;
  
  return (
    <>
      <table className="compliance-resource-table wp-100 ">
        <tr
          className="flex-r wp-100 pos-sk t-0 bg-white pt-15 pb-15"
          style={{ borderBottomWidth: 1, borderBottomColor: "#e6eaf0", borderBottomStyle: "solid" }}
        >
          <th className="flex-3">Resources</th>
          <th className="flex-1">JSON</th>
        </tr>
        {resourcesId?.map((item,index)=>(
          <tr className="flex-r wp-100 mt-20 mb-20 pl-15 pr-15">
          <td className="flex-3 flex-r-ac">
            <StatusComponet status={item.status}/>
            <span className="f-14 lh-2.1 wp-85" style={{wordBreak:'break-word'}} >{item.resourceId}</span>
          </td>
          <td className="flex-1" style={{ textAlign: "center" }}>
            <ComplianceViewButton dark />
          </td>
        </tr>
        ))}
        
      </table>
    </>
  )
}

export default ResourceDataTable
