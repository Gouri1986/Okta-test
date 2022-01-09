
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
     <p>
        <span className='font-weight-bold'>DC Hall Name :</span> {data.dcHallName}
      </p>
      <p>
        <span className='font-weight-bold'>DC Name :</span> {data.dcName}
      </p>
      <p>
        <span className='font-weight-bold'>Address 1 :</span> {data.dcHallLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>Address 2 :</span> {data.dcHallLocationAddress2}
      </p>
      <p>
        <span className='font-weight-bold'>Address 3 :</span> {data.dcHallLocationAddress3}
      </p>
      <p>
        <span className='font-weight-bold'>City :</span> {data.dcHallCity}
      </p>
      <p>
        <span className='font-weight-bold'>Pincode :</span> {data.dcHallCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'>State :</span> {data.dcHallState}
      </p>
      <p>
        <span className='font-weight-bold'>Country :</span> {data.dcHallCountry}
      </p>
      <p>
        <span className='font-weight-bold'>Country Code :</span> {data.dcHallCountryCode}
      </p>
   
      <p>
        <span className='font-weight-bold'>DC Hall Primary Email :</span> {data.dcHallPrimaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'>DC Hall Primary Phone :</span> {data.dcHallPrimaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'>DC Hall Secondary Email :</span> {data.dcHallSecondaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'>DC Hall Secondary Phone :</span> {data.dcHallSecondaryPhone}
      </p>
           
    </div>
  ) 
  
}

export default ExpandableTable
