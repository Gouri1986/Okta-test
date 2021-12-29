
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Functional Group Name :</span> {data.fgName}
      </p>
      <p>
        <span className='font-weight-bold'>Functional Group Level :</span> {data.fgLevel}
      </p>
      <p>
        <span className='font-weight-bold'>Business ID :</span> {data.businessgroupId}
      </p>
      <p>
        <span className='font-weight-bold'>Description :</span> {data.fgDescription}
      </p>
       <p>
        <span className='font-weight-bold'>Top Level ID :</span> {data.topLevelFgId}
      </p>
      <p>
        <span className='font-weight-bold'>Top Level FG Level :</span> {data.topLevelFgLevel}
      </p> 
      <p>
        <span className='font-weight-bold'>First Name :</span> {data.fgContactFristName}
      </p>
      <p>
        <span className='font-weight-bold'>Last Name :</span> {data.fgContactLastName}
      </p> <p>
        <span className='font-weight-bold'>Phone 1 :</span> {data.fgContactPhone1}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 :</span> {data.fgContactPhone2}
      </p> <p>
        <span className='font-weight-bold'>Phone 1 ISD :</span> {data.fgContactPhone1Isd}
      </p>
      <p>
        <span className='font-weight-bold'>Phone 2 ISD :</span> {data.fgContactPhone2Isd}
      </p> <p>
        <span className='font-weight-bold'>Email 1 :</span> {data.fgContactEmail1}
      </p>
      <p>
        <span className='font-weight-bold'>Email 2 :</span> {data.fgContactEmail2}
      </p>
    </div>
  )
  
}
export default ExpandableTable
