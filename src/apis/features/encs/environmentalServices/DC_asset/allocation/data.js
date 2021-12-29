
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> DC Asset Name :</span> {data.dcAssetName}
      </p>
      <p>
        <span className='font-weight-bold'> DC Asset Allocation Owner Group :</span> {data.assetAllocOwnerGroup}
      </p>
      <p>
        <span className='font-weight-bold'> DC Asset Allocation Request Type :</span> {data.allocRequestType}
      </p>
      <p>
        <span className='font-weight-bold'> DC Asset Allocation Ticket Number :</span> {data.ticketNunber}
      </p>
      <p>
        <span className='font-weight-bold'> DC Asset Allocation Date :</span> {data.allocatedDate}
      </p> 
    </div>
  ) 
  
}

export default ExpandableTable
