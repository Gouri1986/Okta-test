
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Supplier Customer ID :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Name :</span> {data.supplierName}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Address 1:</span> {data.supplierLocationAddress1}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Address 2 :</span> {data.supplierLocationAddress2}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Address 3 :</span> {data.supplierLocationAddress3}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Country :</span> {data.supplierCountry}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Country Code :</span> {data.supplierCountryCode}
      </p>
       <p>
        <span className='font-weight-bold'>Supplier State :</span> {data.supplierState}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier City :</span> {data.supplierLocationCity}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier City Pincode :</span> {data.supplierCityPincode}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Primary Phone :</span> {data.supplierPrimaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Secondary Phone :</span> {data.supplierSecondaryPhone}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Primary Email :</span> {data.supplierPrimaryEmail}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier Secondary Email :</span> {data.supplierSecondaryEmail}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
