
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> OCI Respartition AD  :</span> {data.ociResPartitionAdId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Application Sub Partition :</span> {data.app_sub_partitionName}
    //   </p>
    <div className = 'expandable-content pb-2'>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Respartition AD</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.ociResPartitionAdId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Application Sub Partition</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.app_sub_partitionName}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
