
const Data = (props) => {
    return (
        <div className='expandable-content pb-2'>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Cloud Master</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Cloud Type</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudType}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Customer</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.customerBusinessName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Private Cloud Config</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.privateCloudConfig}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Private Cloud Name</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.privateCloudName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Cloud Name</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Owner Name</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 1</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerLocationAddress1}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 2</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerLocationAddress2}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 3</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerLocationAddress3}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Owner City</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerCity}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Owner Pincode</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerCityPincode}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>State</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerState}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Owner Country</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerCountry}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Owner Country Code</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerCountryCode}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Primary Phone</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerPrimaryPhone}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Secondary Phone</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerSecondaryPhone}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Primary Email</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerPrimaryEmail}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Secondary Email</span> <br></br>
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudOwnerSecondaryEmail}
                </span>
            </p>
        </div>
    )

}

export default Data
