
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>DC Asset Type Name :</span> {data.dcAssetTypeName}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.dcAssetTypeDesc}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
