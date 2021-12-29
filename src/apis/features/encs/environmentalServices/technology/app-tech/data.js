
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Application Technology Name:</span> {data.iscTechCategoryName}
      </p>
      <p>
        <span className='font-weight-bold'>Technology Category Name :</span> {data.iscAppTechName}
      </p>
      <p>
        <span className='font-weight-bold'>Application Technology Tags :</span> {data.iscAppTechTags}
      </p>
     
      <p>
        <span className='font-weight-bold'>Description :</span> {data.iscAppTechDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
