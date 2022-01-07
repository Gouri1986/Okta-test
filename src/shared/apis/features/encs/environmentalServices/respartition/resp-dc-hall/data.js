
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Resource Partition Name :</span> {data.resPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'>DC Hall :</span> {data.dcHallName}
      </p>
      
    </div>
  ) 
  
}

export default ExpandableTable
