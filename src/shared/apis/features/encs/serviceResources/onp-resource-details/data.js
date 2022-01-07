
const Data = (props) => {
  return (
    <div className='expandable-content pb-2'>
      <p>
        <span className='' style={{ fontSize: '12px' }}>ONP Resource Name </span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpResourceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpResourceMasterDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>ONP Service Master</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpServiceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Tags</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsTags}
        </span>
      </p>
    </div>
  )

}

export default Data
