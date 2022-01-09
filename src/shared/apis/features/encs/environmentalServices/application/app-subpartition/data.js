
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> App SubPartition Name :</span> {data.appSubPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'> App Partition :</span> {data.appPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'> App SubPartition Description :</span> {data.appSubPartitionDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
