
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Data Technology Name :</span> {data.iscDataTechName}
      </p>
      <p>
        <span className='font-weight-bold'>Technology Category Name:</span> {data.iscTechCategoryName}
      </p>
      <p>
        <span className='font-weight-bold'>Data Tech Tags :</span> {data.iscDataTechTags}
      </p>
    
      <p>
        <span className='font-weight-bold'>Description :</span> {data.iscDataTechDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
