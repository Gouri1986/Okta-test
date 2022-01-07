
export const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
     <p>
        <span className='font-weight-bold'>Customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Location Name :</span> {data.customerLocationName}
      </p>
      <p>
        <span className='font-weight-bold'>Address 1 :</span> {data.customerLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>Address 2 :</span> {data.customerLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>Address 3 :</span> {data.customerLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>City :</span> {data.customerLocationCity}
      </p>
      <p>
        <span className='font-weight-bold'>City Pincode :</span> {data.customerCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'>State :</span> {data.customerState}
      </p>
      <p>
        <span className='font-weight-bold'>Country :</span> {data.customerCountry}
      </p>
      <p>
        <span className='font-weight-bold'>Country Code :</span> {data.countryCode}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 1 :</span> {data.customerLocationPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 :</span> {data.customerLocationPhone2}
      </p>
      <p>
        <span className='font-weight-bold'>Email 1 :</span> {data.customerLocationEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Email 2 :</span> {data.customerLocationEmail2}
      </p>
     
    </div>
  )
  
}

export default ExpandableTable
