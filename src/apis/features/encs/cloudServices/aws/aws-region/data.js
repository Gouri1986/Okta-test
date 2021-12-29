
// ** Expandable table component
const Data = (props) => {
    return (
        // <div className='expandable-content p-2'>
        //   <p>
        //     <span className='font-weight-bold'> Region ID :</span> {data.regionId}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Region Cloud :</span> {data.cloudName}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Region Location :</span> {data.regionLocation}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Address 1 :</span> {data.regionLoactionAddress1}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Address 2 :</span> {data.regionLoactionAddress2}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Address 3 :</span> {data.regionLoactionAddress3}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Region City :</span> {data.regionCity}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Region Pincode :</span> {data.regionCityPincode}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> State :</span> {data.regionState}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Country :</span> {data.regionCountry}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Country Code :</span> {data.regionCountryCode}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Primary Phone :</span> {data.regionPrimaryPhone}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Secondry Phone :</span> {data.regionSecondryPhone}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Primary Email :</span> {data.regionPrimaryEmail}
        //   </p>
        //   <p>
        //     <span className='font-weight-bold'> Secondry Email :</span> {data.regionSecondryEmail}
        //   </p>
        <div expandable-content pb-2>
            <p>
                <span className='' style={{ fontSize: '12px' }}> Region Id</span><br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionId}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Cloud Name</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.cloudName}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Region Location</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionLocation}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 1</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionLocationAddress1}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 2</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionLocationAddress2}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Address 3</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionLocationAddress3}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>City</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionCity}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Pincode</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionCityPincode}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>State</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionState}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Country</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionCountry}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Country Code</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionCountryCode}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Primary Phone</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionPrimaryPhone}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Secondary Phone</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionSecondryPhone}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Primary Email</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionPrimaryEmail}
                </span>
            </p>
            <p>
                <span className='' style={{ fontSize: '12px' }}>Secondary Email</span> <br />
                <span className='font-weight-bold' style={{ fontSize: '13px' }}>
                    {props.sliderdata.regionSecondryEmail}
                </span>
            </p>
        </div>
    )

}

export default Data
