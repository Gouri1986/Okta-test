

const Data = (props) => {
  return (

    <div>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceMasterDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Type</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceType}
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
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Group</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceGroup}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Tags</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsTags}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Metadata Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceMetadataName}
        </span>
      </p>
    </div>
  )

}

export default Data
