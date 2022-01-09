// ** React Imports
import { Fragment, useState, useEffect } from "react"
// ** Table Data & Columns
import ExpandableTable from "./data"

// ** Add New Modal Component
import AddNewModal from "./AddNewModal"

// ** Update Modal Component
import UpdateModal from "./UpdateModal"

// ** Add New Modal Component
import SettingButton from "./SettingButton"

// ** Third Party Component
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { ChevronDown, FileText, Plus, Edit, Trash, FilePlus, Search } from "react-feather"
import { InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardTitle, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Row, Col, Label, Input } from "reactstrap"
import axios from 'axios'
import { toast, Slide } from 'react-toastify'

// Custom Components
import { ToastContentSuccess } from '@components/delete-notification/NotificationSuccess'
import { ToastContentFail } from '@components/delete-notification/NotificationFail'
import handleConfirmText from "@components/delete-notification/AlertWithSinglePass"
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/SuccessWithout'
import Breadcrumbs from '@components/breadcrumbs'

import { store } from '../../../../../redux/storeConfig/store'

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [isctechcategoryname, setIscTechCategoryName] = useState([])

  // ** Function to handle New Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle Edit Modal toggle
  const handleUpdateModal = () => setUpdate(!update)

  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  // Retriving token from Redux store
  const tokenstate = store.getState()
  console.log("🚀 ~ file: TableWithButtons.js ~ line 39 ~ DataTableWithButtons ~ tokenstate", tokenstate.auth.userData.token)
  // const token = tokenstate.auth.userData.token //token

  //Hook to calculate loading time
  const [pending, setPending] = useState(true)

  //--------------------------------------API Get Request---------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`,
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
        setPending(false)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  //--------------------------------------- API Post request-----------------------------------------------------------------
  const postRequest = (isctechcategorydescription, isctechcategoryname, isctechcategorytags) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`, {
      iscTechCategoryDescription: isctechcategorydescription,
      iscTechCategoryName: isctechcategoryname,
      iscTechCategoryTags: isctechcategorytags,
      ui: true
    },
      {
        headers: {
          "Content-Type": "application/json",
          "access-token": `${token}`
        }
      }
    )
      .then((response) => {
        // Handle success.
        console.log("Well done!")
        console.log("Respone = ", response)
        if (response.data.message === "You are trying to insert duplicate records") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "Parent key not found") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else {
          const Notification_msg = "Added!"
          const Success_msg = response.data.message
          setData(response.data.data)
          handleSuccess(Success_msg, Notification_msg)
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
  //---------------------------API Put Request-------------------------------------------------------------
  const putRequest = (isctechcategorydescription, isctechcategoryname, isctechcategorytags) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`, {
      iscTechCategoryDescription: isctechcategorydescription,
      iscTechCategoryName: isctechcategoryname,
      iscTechCategoryTags: isctechcategorytags,
      ui: true
    },
      {
        headers: {
          "Content-Type": "application/json",
          "access-token": `${token}`
        }
      }
    )
      .then((response) => {
        // Handle success.
        console.log("Well done!")
        // setisSucess(true)
        if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else {
          const Notification_msg = "Updated!"
          const Success_msg = response.data.message
          setData(response.data.data)
          handleSuccess(Success_msg, Notification_msg)
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
  //---------------------------Delete Request--------------------------------------------
  const removeData = (iscTechCategoryName) => {
    const DeletePassFunction = (data) => {
      const deletevar = data
      console.log("deletevar = ", deletevar)
      axios.delete(`${process.env.REACT_APP_URL}/api/v1/encs-tech-category-master`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `${token}`
          },
          data: {
            iscTechCategoryName: deletevar,
            ui: true
          }
        }
      ).then((response) => {
        console.log("Response = ", response)
        if (response.data.message === "Record deleted successfuly") {
          toast.success(
            <ToastContentSuccess message={response.data.message} deletevar={deletevar} />,
            { transition: Slide, hideProgressBar: true, autoClose: 4000 }
          )
          setData(response.data.data)//Store data
        } else {
          toast.error(
            <ToastContentFail message={response.data.message} deletevar={deletevar} />,
            { transition: Slide, hideProgressBar: true, autoClose: 4000 }
          )
        }
      }).catch((error) => {
        console.error("Error = ", error)
      })
    }
    handleConfirmText(iscTechCategoryName, { DeletePassFunction })
  }

  //setting
  const [hide, setHide] = useState(false)
  const state = () => setHide(!hide)
  const caseCheck = hide

  const columns = [
    {
      name: 'Technology Category  Name',
      selector: 'email',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '250px' }}>{row.iscTechCategoryName}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Technology Category Tags',
      selector: 'salary',
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '150px' }}>{row.iscTechCategoryTags}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Description',
      selector: 'full_name',
      sortable: true,
      minWidth: '250px',
      omit: hide,
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate ml-1' >
            <span className='d-block font-weight-bold text-truncate' style={{ width: '150px' }}>{row.iscTechCategoryDescription}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Action',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <div className='w-100'
              onClick={() => {
                handleUpdateModal()
                setIscTechCategoryName(row)
                console.log(isctechcategoryname)
              }}>
              <Edit size={15} />
            </div>
            <div className='w-100' onClick={() => removeData(row.iscTechCategoryName)}>
              <Trash size={15} />
            </div>

            {/* <Edit size={15} /> */}
          </div>
        )
      }
    }
  ]

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.iscTechCategoryTags.toLowerCase().startsWith(value.toLowerCase()) ||
          item.iscTechCategoryDescription.toLowerCase().startsWith(value.toLowerCase()) ||
          item.iscTechCategoryName.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.iscTechCategoryTags.toLowerCase().includes(value.toLowerCase()) ||
          item.iscTechCategoryDescription.toLowerCase().includes(value.toLowerCase()) ||
          item.iscTechCategoryName.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Custom 
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
  const spinner = () => {
    return (
      <div className='text-center'>
        <Spinner />
      </div>
    )
  }
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Technology Category Master'
        breadCrumbParent='Environmental Services'
        breadCrumbParent2='Technology'
        breadCrumbActive='Technology Category Master'
      />
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          {/* <CardTitle tag="h4" style={{ color: 'white' }}>Technology Category Master</CardTitle> */}
          <Col className='justify-content-left'>
            <InputGroup className='input-group-merge mb-2'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <Search size={20} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder='search...'
                id='search-input'
                value={searchValue}
                onChange={handleFilter}
                className='dataTable-filter'
                type='text'
                bsSize='18'
              />
            </InputGroup>
          </Col>
          <div className="d-flex mt-md-0 mt-1">
            {/* ADD Button */}
            <Button.Ripple size="lg" className="btn-icon btn-round ml-1" color="primary" onClick={handleModal}>
              <Plus size={15} />
            </Button.Ripple>
            <UncontrolledButtonDropdown>
              <DropdownToggle size="lg" className="btn-icon btn-round ml-1 mr-1" color="primary" style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                <FilePlus size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="w-100" onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {/* Setting Compeonent */}
            <SettingButton state={state} caseCheck={caseCheck} />
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
        </Row>
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
          data={searchValue.length ? filteredData : data}
          progressPending={pending}
          progressComponent={<SkeletonLoading />}
        />
      </Card>
      <AddNewModal open={modal} setData={setData} handleModal={handleModal} postRequest={postRequest} />
      <UpdateModal open={update} handleUpdateModal={handleUpdateModal} value={isctechcategoryname} putRequest={putRequest} />
    </Fragment>
  )
}
export default DataTableWithButtons
