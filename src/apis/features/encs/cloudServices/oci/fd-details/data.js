
// ** Expandable table component
const Data = (props) => { 
  return (
    <div className = 'expandable-content pb-2'>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI FD : </span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.fdId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Region ID</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adRegionId}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
