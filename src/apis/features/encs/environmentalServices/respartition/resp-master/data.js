
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Resource Partition :</span> {data.resPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.resPartitionDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
