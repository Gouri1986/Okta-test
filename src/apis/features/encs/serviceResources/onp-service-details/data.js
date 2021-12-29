const Data = (props) => {
  return (
    <div className='expandable-content pb-2'>
      <p>
        <span className='' style={{ fontSize: '12px' }}>ONP Service Name </span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpServiceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpServiceMasterDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Customer</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.customerName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>ONP Service Type</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpServiceType}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Name</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>ONP Technology Type</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.onpTechnologyType}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>OS Technology Master</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsOsTechMaster}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Data Technology Master </span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsDataTechMaster}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Application Technology Master</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsAppTechMaster}
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

