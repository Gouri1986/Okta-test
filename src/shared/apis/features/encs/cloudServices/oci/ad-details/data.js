
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD :</span> {data.adRegionId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD City :</span> {data.adCity}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Address 1 :</span> {data.adLocationAddress1}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Address 2 :</span> {data.adLocationAddress2}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Address 3 :</span> {data.adLocationAddress3}
    //   </p>
     
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Pincode :</span> {data.adCityPincode}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD State :</span> {data.adState}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Country :</span> {data.adCountry}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Country Code :</span> {data.adCountryCode}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Primary Phone :</span> {data.adPrimaryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Secondary Phone :</span> {data.adSecondaryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Primary Email :</span> {data.adPrimaryEmail}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI AD Secondary Email :</span> {data.adSecondaryEmail}
    //   </p>
    // </div>
    <div className = 'expandable-content pb-2'>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD </span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adRegionId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD City</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adCity}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Address 1</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adLocationAddress1}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Address 2</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adLocationAddress2}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Address 3</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adLocationAddress3}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Pincode</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adCityPincode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD State</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adState}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Country</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adCountry}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Country Code</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adCountryCode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Primary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adPrimaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Secondary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adSecondaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Primary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adPrimaryEmail}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI AD Secondary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.adSecondaryEmail}
        </span>
    </p>
</div>
  ) 
  
}

export default Data
