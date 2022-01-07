
// ** Expandable table component
const ExpandableTable = ({ data }) => { 
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'> App Enviornment Name :</span> {data.appEnvName}
      </p>
      <p>
        <span className='font-weight-bold'> Application Name :</span> {data.applicationName}
      </p>
      <p>
        <span className='font-weight-bold'> App Enviornment Description :</span> {data.appEnvDescription}
      </p>
    </div>
  ) 
  
}

export default ExpandableTable
