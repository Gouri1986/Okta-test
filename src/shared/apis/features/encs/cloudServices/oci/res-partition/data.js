
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> OCI Repartition AD customer Business Name :</span> {data.customerBusinessName}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Repartition AD ResPartition Name :</span> {data.resPartitionName}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Repartition AD ID :</span> {data.adId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Repartition AD Region ID :</span> {data.adRegionId}
    //   </p>
    <div className = 'expandable-content pb-2'> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Repartition AD customer Business Name </span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.customerBusinessName}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Repartition AD ResPartition Name</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.resPartitionName}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Repartition AD ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Repartition AD Region ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adRegionId}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
