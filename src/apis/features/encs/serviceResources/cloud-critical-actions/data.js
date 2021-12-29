

const Data = (props) => {
  return (

    <div>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Critical Action Title</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudCriticalActionTitle}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudCriticalActionDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Type</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudType}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudName}
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
