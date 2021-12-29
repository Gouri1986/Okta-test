// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react"

// ** Table Data & Columns
import ExpandableTable, { } from "./data"

// ** Add New Modal Component
import AddNewModal from "./AddNewModal"

// ** Update Modal Component
import UpdateModal from "./UpdateModal"
// ** Add New Modal Component
import SettingButton from "./SettingButton"

// ** Third Party Component
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import {
  ChevronDown,
  FileText,
  Plus,
  Edit,
  Trash,
  DownloadCloud
} from "react-feather"
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner
} from "reactstrap"

import axios from 'axios'

import { toast, Slide } from 'react-toastify'
// Custom Components
import { ToastContentSuccess } from '@components/delete-notification/NotificationSuccess'
import { ToastContentFail } from '@components/delete-notification/NotificationFail'
import handleConfirmText from "@components/delete-notification/AlertWithSinglePass"
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/SuccessWithout'
import Breadcrumbs from '@components/breadcrumbs'
const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [isctechcategoryname, setIscTechCategoryName] = useState([])
  
  const [input, setInput] = useState([])


  // ** Function to handle New Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle Edit Modal toggle
  const handleUpdateModal = () => setUpdate(!update)

  // dummy Token 
const [token, setToken] = useState(
  localStorage.getItem('token') || ''
)

//Spinner state
const [pending, setPending] = useState(true)

  
//--Fetching-
useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-business-group-details`,
    {
      headers: {               
        "Content-Type": "application/json",
        "access-token": `${token}`
      }
    }
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching!")
   //  setIsLoaded(true)
    setData(response.data.data)
    console.log(response.data.data)
    setPending(false)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])
 //--Fetching ends
 
//--re fetching data--
const fetchData = () => {
  axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-business-group-details`,
  {
    headers: {               
      "Content-Type": "application/json",
      "access-token": `${token}`
    }
  }
)
.then((response) => {
  // Handle success.
  console.log("Connection established.Data is fetching!")
 //  setIsLoaded(true)
  setData(response.data.data)
  console.log(response.data.data)
  })
  .catch((error) => {
    console.error(error)
})
}
//--re fetching data end--
 
//--Delete method-
const removeData = (businessGroupId) => {
  const DeletePassFunction = (data) => {
    const deletevar = data
    console.log("deletevar = ", deletevar)
    axios.delete(`${process.env.REACT_APP_URL}/api/v1/encs-business-group-details`,
    {
        headers: {               
          "Content-Type": "application/json",
          "access-token": `${token}`
        },
        data : { businessGroupId : deletevar }
      }
      ).then((response) => {
          console.log("Response = ", response)
          if (response.data.message === "Record deleted successfuly") {
            toast.success(
              <ToastContentSuccess message={response.data.message} deletevar={deletevar}/>,
              { transition: Slide, hideProgressBar: true, autoClose: 4000 }
            )
          } else {
            toast.error(
              <ToastContentFail message={response.data.message} deletevar={deletevar}/>,
              { transition: Slide, hideProgressBar: true, autoClose: 4000 }
            )
          }
          fetchData()
      }).catch((error) => {
        console.error("Error = ", error)
      })
  }
  handleConfirmText(businessGroupId, {DeletePassFunction}) 
}
//--Delete method End-
 const columns = [

  {
    name: 'Business Group Name',
    selector: 'group_name',
    sortable: true,
    minWidth: '280px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },

  {
    name: 'Customer',
    selector: 'customer_id',
    sortable: true,
    minWidth: '300px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.customerBusinessName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Description',
    selector: 'descreption',
    sortable: true,
    minWidth: '300px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate' style={{width:'250px'}}>{row.businessGroupDescription}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Fisrt Name',
    selector: 'first_name',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactFirstName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Last Name',
    selector: 'last_name',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactLastName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Department Name',
    selector: 'deapartment_name',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactDeptName}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  
  {
    name: 'Phone 1',
    selector: 'phone_1',
    sortable: true,
    minWidth: '300px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactPhone1}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Phone 2',
    selector: 'phone2',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactPhone2}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
    
  {
    name: 'Phone 1 ISD',
    selector: 'phone1isd',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactPhone1ISD}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },

  {
    name: 'Phone 2 ISD',
    selector: 'phone2isd',
    sortable: true,
    minWidth: '150px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'>{row.businessGroupContactPhone2ISD}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },

  {
    name: 'Email 1',
    selector: 'email1',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate'  style={{width:'200px'}}>{row.businessGroupContactEmail1}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Email 2',
    selector: 'email2',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='user-info text-truncate '>
          <span className='d-block font-weight-bold text-truncate' style={{width:'200px'}}>{row.businessGroupContactEmail2}</span>
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
      
              <div tag='a' className='w-100'
              onClick={() => {
                handleUpdateModal()
                setIscTechCategoryName(row)
                console.log(isctechcategoryname)
              }}>
                <Edit size={15} />
              </div>
             
              <div tag='a'  className='w-100'  onClick={() => removeData(row.businessGroupId)}>
                <Trash size={15} />
              </div>
  
          {/* <Edit size={15} /> */}
        </div>
      )
    }
  }
]

  // ** Function to handle filter
 
  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Custom 
  if (!data) {  
    setData([])
  }
  if (!data) { 
    setData([])
  }
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length ? filteredData.length / 7 : data.length / 7 || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ","
    const lineDelimiter = "\n"
    const keys = Object.keys(data[0])

    result = ""
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a")
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = "export.csv"

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csvcharset=utf-8,${csv}`
    }

    link.setAttribute("href", encodeURI(csv))
    link.setAttribute("download", filename)
    link.click()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4" style={{ color: 'white'}}>Business Group Details</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <UncontrolledButtonDropdown>
            <DropdownToggle className="ml-2" color="primary" style={{borderTopRightRadius:'5px', borderBottomRightRadius: '5px'}}>
               <DownloadCloud size={15}/>
                {/* <span className='align-middle ml-50'>Export</span> */}
              </DropdownToggle>
              <DropdownMenu right>
               
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(data)}
                >
                  <FileText size={15} />
                  <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledButtonDropdown>

            {/* ADD Button */}
            <Button className="ml-2 mr-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
            </Button>

            {/* Setting Compeonent */}
            <SettingButton />
          </div>
        </CardHeader>
        {/* <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row> */}
        <DataTable
          noHeader
          pagination
          // selectableRows
          expandableRows
          columns={columns}
          expandOnRowClicked
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={<ExpandableTable />}
          paginationComponent={CustomPagination}
          data={data}
          progressPending={pending}
          progressComponent={<div className='text-center' style={{paddingTop:'20px', paddingBottom:"20px"}}><Spinner /></div>}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} fetchData={fetchData}/>
      <UpdateModal open={update} handleUpdateModal={handleUpdateModal} value={isctechcategoryname} fetchData={fetchData}/>
    </Fragment>
  )
}

export default DataTableWithButtons
