
// ** Expandable table component
const ExpandableTable = ({ data }) => {  
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> DC Name :</span> {data.dcName}
      </p>
      <p>
        <span className='font-weight-bold'>DC Customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Provider Name :</span> {data.dcProviderName}
      </p>
      <p>
        <span className='font-weight-bold'>Provider Type :</span> {data.dcProviderType}
      </p>
     
      <p>
        <span className='font-weight-bold'>Address 1 :</span> {data.dcLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>Address 2 :</span> {data.dcLocationAddress2}
      </p>
      <p>
        <span className='font-weight-bold'>Address 3 :</span> {data.dcLocationAddress3}
      </p>
      <p>
        <span className='font-weight-bold'>City :</span> {data.dcCity}
      </p>
      <p>
        <span className='font-weight-bold'>Pincode :</span> {data.dcCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'>Country :</span> {data.dcCountry}
      </p>
      <p>
        <span className='font-weight-bold'>State :</span> {data.dcMastertate}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Email :</span> {data.dcPrimaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Phone :</span> {data.dcPrimaryPhone}
      </p>
     
    </div>
  ) 
  
}

export default ExpandableTable
