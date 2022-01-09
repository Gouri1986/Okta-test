
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Os technology Name :</span> {data.iscOsTechName}
      </p>
      <p>
        <span className='font-weight-bold'> Tech category name :</span> {data.iscTechCategoryName}
      </p>
      <p>
        <span className='font-weight-bold'>Os Technology Tag :</span> {data.iscOsTechTags}
      </p>
      
      <p>
        <span className='font-weight-bold'>Description :</span> {data.iscOsTechDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
