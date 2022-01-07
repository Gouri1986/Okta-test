
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Name :</span> {data.dcProviderName}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Address 1 :</span> {data.dcProviderLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Address 2 :</span> {data.dcProviderLocationAddress2}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Address 3 :</span> {data.dcProviderLocationAddress3}
      </p>
       
      <p>
        <span className='font-weight-bold'> Respartition DC Providers City :</span> {data.dcProviderLocationCity}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Pincode :</span> {data.dcProviderCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers State :</span> {data.dcProviderState}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Country :</span> {data.dcProviderCountry}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Country Code :</span> {data.dcProviderCountryCode}
      </p>
    
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Primary Email :</span> {data.dcProviderPrimaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Primary Phone :</span> {data.dcProviderPrimaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Secondary Email :</span> {data.dcProviderSecondaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'> Respartition DC Providers Secondary Phone :</span> {data.dcProviderSecondaryPhone}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
