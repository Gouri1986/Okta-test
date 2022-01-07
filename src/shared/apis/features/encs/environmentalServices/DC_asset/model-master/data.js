
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>DC Asset Model Id:</span> {data.dcAssetModelName}
      </p>
      <p>
        <span className='font-weight-bold'>DC Asset Model Name:</span> {data.dcAssetModelName}
      </p>
      <p>
        <span className='font-weight-bold'>Supplier:</span> {data.supplierName}
      </p>
      <p>
        <span className='font-weight-bold'>Customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>DC Asset Vendor :</span> {data.dcAssetVendorName}
      </p>
      <p>
        <span className='font-weight-bold'>Model Description :</span> {data.dcAssetModelDesc}
      </p>
      <p>
        <span className='font-weight-bold'>MDC Asset Type  :</span> {data.dcAssetTypeName}
      </p>
      
    </div>
  ) 
  
}

export default ExpandableTable
