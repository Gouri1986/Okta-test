
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Application Name :</span> {data.applicationName}
      </p>
      <p>
        <span className='font-weight-bold'>Functional Group:</span> {data.fgName}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.applicationDescription}
      </p>
      <p>
        <span className='font-weight-bold'>First Name :</span> {data.applicationContactFirstName}
      </p>
      <p>
        <span className='font-weight-bold'>TLast Name :</span> {data.applicationContactLastName}
      </p>
      <p>
        <span className='font-weight-bold'>Department Name :</span> {data.applicationContactDeptName}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 1 :</span> {data.applicationContactPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 :</span> {data.applicationContactPhone2}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 1 ISD :</span> {data.applicationContactPhone1ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 ISD :</span> {data.applicationContactPhone2ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Email 1 :</span> {data.applicationContactEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Email 2 :</span> {data.applicationContactEmail2}
      </p>
    </div>
  )
  
}

export default ExpandableTable
