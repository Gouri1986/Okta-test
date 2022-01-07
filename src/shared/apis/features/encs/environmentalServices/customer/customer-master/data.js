
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> Customer Name :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'> Business Type :</span> {data.customerBusinessType}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Profile :</span> {data.customerProfile}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Profile Type :</span> {data.customerProfileFile}
      </p>
      <p>
        <span className='font-weight-bold'> Customer MIME Type :</span> {data.mimeTypeColumn}
      </p>
      <p>
        <span className='font-weight-bold'> Customer File Name :</span> {data.filenameColumn}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Address 1 :</span> {data.customerLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Address 2 :</span> {data.customerLocationAddress2}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Address 3 :</span> {data.customerLocationAddress3}
      </p>
      <p>
        <span className='font-weight-bold'> Customer City :</span> {data.customerLocationCity}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Pincode :</span> {data.customerCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'> Customer State :</span> {data.customerState}
      </p>
      <p> 
        <span className='font-weight-bold'> Customer Country :</span> {data.customerCountry}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Country Code :</span> {data.countryCode}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Primary Phone :</span> {data.customerPrimaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Secondary Phone :</span> {data.customerSecondaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Primary email :</span> {data.customerPrimaryEmailDomain}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Secondary email :</span> {data.customerSecondaryEmailDomain}
      </p>
      <p>
        <span className='font-weight-bold'> Customer URL :</span> {data.customerUrl}
      </p>
      <p>
        <span className='font-weight-bold'> Customer Logo :</span> {data.customerLogo}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
