
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Partition Name :</span> {data.resPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'>Subpartition Name :</span> {data.appSubPartitionName}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
