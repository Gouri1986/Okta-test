
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> Application :</span> {data.applicationName}
      </p>
      <p>
        <span className='font-weight-bold'> Application Environment :</span> {data.appEnvName}
      </p>
      <p>
        <span className='font-weight-bold'> Application Partition :</span> {data.appPartitionName}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.appPartitionDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
