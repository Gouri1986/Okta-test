
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> AWS Resource Partition AZ :</span> {data.awsResPartitionAzId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> Application Sub Partition :</span> {data.appSubPartitionName}
    //   </p>
    //   {/* <p>
    //     <span className='font-weight-bold'> GCP Application Respartition AZ ID :</span> {data.gcpAppResPartitionAzId}
    //   </p> */}
    // </div>
    <div> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>AWS Resource Partition AZ</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.awsResPartitionAzId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Application Sub Partition</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.appSubPartitionName}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
