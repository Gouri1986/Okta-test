
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>DC Asset Vendor Name:</span> {data.dcAssetVendorName}
      </p>
     
      <p>
        <span className='font-weight-bold'>Description :</span> {data.dcAssetVendorDesc}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
