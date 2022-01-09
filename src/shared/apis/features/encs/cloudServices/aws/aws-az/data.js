
// ** Expandable table component
const Data = (props) => { 
  return (
    // <div className='expandable-content p-2'>
    //   <p>
    //     <span className='font-weight-bold'>Az Id:</span> {data.azId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>AZ Region:</span> {data.azRegionId}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Address 1 :</span> {data.azLocationAddress1}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Address 2 :</span> {data.azLocationAddress2}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Address 3 :</span> {data.azLocationAddress3}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>City :</span> {data.azCity}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Pincode :</span> {data.azCityPincode}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>State :</span> {data.azState}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Country :</span> {data.azCountry}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Country Code :</span> {data.azCountryCode}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Primary Phone :</span> {data.azPrimaryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Secondary Phone :</span> {data.azSecondaryPhone}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Primary Email :</span> {data.azPrimaryEmail}
    //   </p>
    //   <p>
    //     <span className='font-weight-bold'>Secondary Email :</span> {data.azSecondaryEmail}
    //   </p>
    <div> 
    <p>
        <span className='' style={{ fontSize: '12px' }}>AZ</span><br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>AZ Region</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azRegionId}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Address 1</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azLocationAddress1}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Address 2</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azLocationAddress2}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Address 3</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azLocationAddress3}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>City</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azCity}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Pincode</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azCityPincode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>State</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azState}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Country</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azCountry}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Country Code</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azCountryCode}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Primary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azPrimaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Secondary Phone</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azSecondaryPhone}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Primary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azPrimaryEmail}
        </span>
    </p>
    <p>
        <span className='' style={{ fontSize: '12px' }}>Secondary Email</span> <br />
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
            {props.sliderdata.azSecondaryEmail}
        </span>
    </p>
    </div>
  ) 
  
}

export default Data
