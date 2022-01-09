
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> DC Asset Name :</span> {data.dcAssetName}
      </p>
      <p>
        <span className='font-weight-bold'> DC Asset Model :</span> {data.dcAssetModelName}
      </p>
      <p>
        <span className='font-weight-bold'> Supplier :</span> {data.supplierName}
      </p>
      <p>
        <span className='font-weight-bold'> customer :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'> DC Serial :</span> {data.resPartitionDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
