
export const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Customer ID :</span> {data.customerBusinessName}
      </p>
      <p>
        <span className='font-weight-bold'>Primary First Name :</span> {data.customerPrimaryContactFirstName}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Last Name :</span> {data.customerPrimaryContactLastName}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Department :</span> {data.customerPrimaryContactDeptName}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Phone 1 :</span> {data.customerPrimaryContactPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Phone 2 :</span> {data.customerPrimaryContactPhone2}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Email 1 :</span> {data.customerPrimaryContactEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Email 2 :</span> {data.customerPrimaryContactEmail2}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Phone 1 ISD :</span> {data.customerPrimaryContactPhone1ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Primary Phone 2 ISD :</span> {data.customerPrimaryContactPhone2ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary First Name :</span> {data.customerSecondaryContactFirstName}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Last Name :</span> {data.customerSecondaryContactLastName}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Department :</span> {data.customerSecondaryContactDeptName}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Phone 1 :</span> {data.customerSecondaryContactPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Phone 2 :</span> {data.customerSecondaryContactPhone2}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Email 1 :</span> {data.customerSecondaryContactEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Email 2 :</span> {data.customerSecondaryContactEmail2}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Phone 1 ISD :</span> {data.customerSecondaryContactPhone1ISD}
      </p>
      <p>
        <span className='font-weight-bold'>Secondary Phone 2 ISD :</span> {data.customerSecondaryContactPhone2ISD}
      </p>
     
    </div>
  )
  
}

export default ExpandableTable
