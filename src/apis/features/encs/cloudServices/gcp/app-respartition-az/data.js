
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> GCP Resource Partition AZ :</span> {data.gcpResPartitionAzId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> Application Sub Partition :</span> {data.appSubPartitionName}
    //   </p>
    <div> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>GCP Resource Partition AZ</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.gcpResPartitionAzId}
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
