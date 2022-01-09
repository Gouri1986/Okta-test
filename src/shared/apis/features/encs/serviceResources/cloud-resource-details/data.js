// // ** Expandable table component
// const ExpandableTable = ({ data }) => {
//   return (
//     <div className='expandable-content p-2'>
//       <p>
//         <span className='font-weight-bold'>Cloud Resource Name :</span> {data.cloudResourceName}
//       </p>
//       <p>
//         <span className='font-weight-bold'>Description :</span> {data.cloudResourceMasterDescription}
//       </p>
//       <p>
//         <span className='font-weight-bold'>Cloud Service Master :</span> {data.cloudServiceName}
//       </p>
//       <p>
//         <span className='font-weight-bold'>Cloud Dependent Services :</span> {data.cloudDependentServices}
//       </p>
//       <p>
//         <span className='font-weight-bold'>Tags :</span> {data.encsTags}
//       </p>
//     </div>
//   )

// }

// export default ExpandableTable
const Data = (props) => {
  return (
    <div className='expandable-content pb-2'>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Resource Name </span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudResourceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Description</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudResourceMasterDescription}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Service Master</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudServiceName}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Cloud Dependent Services</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.cloudDependentServices}
        </span>
      </p>
      <p>
        <span className='' style={{ fontSize: '12px' }}>Tags</span> <br></br>
        <span className='font-weight-bold' style={{ fontSize: '13px' }}>
          {props.sliderdata.encsTags}
        </span>
      </p>
    </div>
  )
}
export default Data

