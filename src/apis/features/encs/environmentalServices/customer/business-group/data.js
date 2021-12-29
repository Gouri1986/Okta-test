// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Group Name :</span> {data.businessGroupName}
      </p>
      <p>
        <span className='font-weight-bold'>Business Name :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.businessGroupDescription}
      </p>
      <p>
        <span className='font-weight-bold'>Fisrt Name :</span> {data.businessGroupContactFirstName}
      </p>
      <p>
        <span className='font-weight-bold'>Last Name :</span> {data.businessGroupContactLastName}
      </p>
      <p>
        <span className='font-weight-bold'>Department Name :</span> {data.businessGroupContactDeptName}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 1 :</span> {data.businessGroupContactPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 :</span> {data.businessGroupContactPhone2}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 1 ISD :</span> {data.businessGroupContactPhone1ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 ISD :</span> {data.businessGroupContactPhone2ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Email 1 :</span> {data.businessGroupContactEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Email 2 :</span> {data.businessGroupContactEmail2}
      </p>
    </div>
  )
  
}
export default ExpandableTable
