

const Data = (props) => {
  return (

    <div>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Metadata Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceMetadataName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudresourceMetadataDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Resource Metadata Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudresourceMetadataName}
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
