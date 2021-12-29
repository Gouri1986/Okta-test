
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'>Customer:</span> {data.customerBusinessName}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Resource Partition Name :</span> {data.resPartitionName}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Az ID :</span> {data.azId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Region ID :</span> {data.azRegionId}
    //   </p>
    <div> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>Customer</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.customerBusinessName}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Resource Partition Name</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.resPartitionName}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Az ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Region ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azRegionId}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
