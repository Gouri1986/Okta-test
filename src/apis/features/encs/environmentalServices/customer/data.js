// ** Custom Components
// import './tech-master/TableWithButtons'
import { Fragment, useState, useEffect, forwardRef } from 'react'
// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

let data
// // ** Get initial Data
axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-application-details`, {
  headers: {
    "Content-Type": "application/json",
    "access-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJhZGFteWFAYmFueWFuZGF0YS5jb20iLCJpYXQiOjE2MjM5MzMyMzksImV4cCI6MTYyMzk0MDQzOX0.EA54bCoAc4YmoOK9GhLLSyeNMqMMEWrtivkCOnNfS3g`
  }
})
.then(response => {
  data = response.data
})


// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>Tech Category Description :</span> {data.fgId}&nbsp;
        {/* <span className='font-weight-bold'>Tech Category Name :</span> {data.iscTechCategoryName}&nbsp;
        <span className='font-weight-bold'>Tech Category Tags :</span> {data.iscTechCategoryTags} */}
      </p>
      {/* <p>
        <span className='font-weight-bold'>Tech Category Name :</span> {data.iscTechCategoryName}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Tech Category Tags :</span> {data.iscTechCategoryTags}
      </p> */}
    </div>
  )
  
}
// Hook variables

//Fetching
// useEffect(() => { }, [])
  // if (isLoaded === false) {
//    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-application-details`,
//    {
//      headers: {               
//        "Content-Type": "application/json",
//        "access-token": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJhZGFteWFAYmFueWFuZGF0YS5jb20iLCJpYXQiOjE2MjI4NzU5MDksImV4cCI6MTYyMjg4MzEwOX0.2OT84hdNwEdjo5EUlw8MuI1FoWbKKnLy1GKnNxLTKY8`
//      }
//    }
//  )
//  .then((response) => {
//    // Handle success.
//    console.log("Connection established.Data is fetching!")
//   //  setIsLoaded(true)
//   //  setData(response.data.data)
//    console.log(response.data)
//    })
//    .catch((error) => {
//      console.error(error)
// })

// ******************************************************Fetching ends*******************************************************************************************


// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.iscTechCategoryDescription}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Description',
    selector: 'email',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.iscTechCategoryName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Tag',
    selector: 'salary',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.iscTechCategoryTags}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Edit',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Edit size={15} />
                <span className='align-middle ml-50'>Edit</span>
              </DropdownItem>
              {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem> */}
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* <Edit size={15} /> */}
        </div>
      )
    }
  }
]

export default ExpandableTable
