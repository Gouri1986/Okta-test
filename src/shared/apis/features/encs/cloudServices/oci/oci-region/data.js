
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region ID :</span> {data.regionId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Cloud :</span> {data.cloudName}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Location :</span> {data.regionLocation}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Address 1 :</span> {data.regionLocationAddress1}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Address 2 :</span> {data.regionLocationAddress2}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Address 3 :</span> {data.regionLocationAddress3}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region City :</span> {data.regionCity}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Pincode :</span> {data.regionCityPincode}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region State :</span> {data.regionState}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Country :</span> {data.regionCountry}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Country Code :</span> {data.regionCountryCode}
    //   </p> 
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Primary Phone :</span> {data.regionPrimaryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Secondary Phone :</span> {data.regionSecondryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Primary Email :</span> {data.regionPrimaryEmail}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'> OCI Region Secondary Email :</span> {data.regionSecondryEmail}
    //   </p>
    // </div>
    <div className = 'expandable-content pb-2'> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region ID</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Cloud</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.cloudName}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Location</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionLocation}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Address 1</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionLocationAddress1}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Address 2</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionLocationAddress2}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Address 3</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionLocationAddress3}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region City</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionCity}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Pincode</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionCityPincode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region State</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionState}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Country</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionCountry}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Country Code</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionCountryCode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Primary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionPrimaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Secondary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionSecondaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Primary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionPrimaryEmail}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>OCI Region Secondary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.regionSecondaryEmail}
        </span>
    </p>
</div>
  ) 
  
}

export default Data
