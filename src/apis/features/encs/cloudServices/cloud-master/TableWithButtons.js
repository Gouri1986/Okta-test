// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react"

// ** Table Data & Columns
import Data from "./data"

// ** Add New Modal Component
import AddNewModal from "./AddNewModal"

// ** Update Modal Component
import UpdateModal from "./UpdateModal"

// ** Add New Modal Component
import SettingButton from "./SettingButton"

// ** Third Party Component
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { ChevronDown, Plus, Edit, Trash, DownloadCloud, Search, Delete, Maximize, Minimize, FilePlus } from "react-feather"
import { InputGroup, InputGroupAddon, InputGroupText, Card, CardHeader, CardTitle, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Row, Col, Label, Input } from "reactstrap"
import axios from 'axios'
import { toast, Slide } from 'react-toastify'

// ** Customized components
import { ToastContentSuccess } from '@components/delete-notification/NotificationSuccess'
import { ToastContentFail } from '@components/delete-notification/NotificationFail'
import handleConfirmText from "@components/delete-notification/AlertWithSinglePass"
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/SuccessWithout'
import Breadcrumbs from '@components/breadcrumbs'
//Drawer Right
import DrawerRight, { useStyles, Clsx } from "@components/collapsibledrawer/DrawerRight"
//Tabular Skeleton
import SkeletonLoading from "@components/skeletonloading/tableloading/SkeletonLoading"

const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [isctechcategoryname, setIscTechCategoryName] = useState([])

  const [open, setOpen] = useState(false) //Hook to store drawer state

  const classes = useStyles() // Hooks for using drawer style
  const [sliderdata, setsliderdata] = useState([]) // Hook for storing row data

  const [xs, setxs] = useState(12)

  //Handling drawer state
  const handleDrawer = () => {
    setOpen(!open)
    setTimeout(function () {
      if (open === false) {
        setxs(8)
      } else {
        setxs(12)
      }
    }, 100)

  }

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


  //-----------------------------------Fetching----------------------------------------------------------------
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-master`,
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
  //-----------------------------------------Fetching ends------------------------------------------------------------
  //-----------------------re fetching data--------------------------
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-master`,
      {
        headers: {
          "access-token": `${token}`,
          "Content-Type": "application/json"
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
  //-----------------------re fetching data end--------------------------
  //-----------------------------------------Delete method----------------------------------------------------------------------
  const removeData = (cloudMasterId) => {
    const DeletePassFunction = (data) => {
      const deletevar = data
      console.log("deletevar = ", deletevar)
      axios.delete(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-master`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `${token}`
          },
          data: { cloudMasterId: deletevar }
        }
      ).then((response) => {
        console.log("Response = ", response)
        if (response.data.message === "Record deleted successfuly") {
          toast.success(
            <ToastContentSuccess message={response.data.message} deletevar={deletevar} />,
            { transition: Slide, hideProgressBar: true, autoClose: 4000 }
          )
        } else {
          toast.error(
            <ToastContentFail message={response.data.message} deletevar={deletevar} />,
            { transition: Slide, hideProgressBar: true, autoClose: 4000 }
          )
        }
        fetchData()
      }).catch((error) => {
        console.error("Error = ", error)
      })
    }
    handleConfirmText(cloudMasterId, { DeletePassFunction })
  }
  //-----------------------------------------Delete method End----------------------------------------------------------------------
  const [address2, setaddress2] = useState(true)
  const stateaddress2 = () => setaddress2(!address2)
  const caseaddress2 = address2

  const [address3, setaddress3] = useState(true)
  const stateaddress3 = () => setaddress3(!address3)
  const caseaddress3 = address3

  const [secondaryphone, setsecondaryphone] = useState(true)
  const statesecondaryphone = () => setsecondaryphone(!secondaryphone)
  const casesecondaryphone = secondaryphone

  const [secondaryemail, setsecondaryemail] = useState(true)
  const statesecondaryemail = () => setsecondaryemail(!secondaryemail)
  const casesecondaryemail = secondaryemail

  const columns = [
    {
      selector: 'id',
      sortable: true,
      maxWidth: '10px',
      reorder: true,
      cell: row => (
        <div tag='a' className='w-100'
          onClick={() => {
            handleDrawer(row)
            setsliderdata(row)
          }}
          style={{ cursor: 'pointer' }}>
          {(!open) ? <Maximize size={15} /> : <Minimize size={15} />}
        </div>
      )
    },
    {
      name: 'Cloud Master',
      selector: 'cloudMasterId',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '150px' }}>{row.cloudName}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Cloud Type',
      selector: 'cloudType',
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudType}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Customer',
      selector: 'customerId',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '150px' }}>{row.customerBusinessName}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Private Cloud Config',
      selector: 'privateCloudConfig',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.privateCloudConfig}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Private Cloud Name',
      selector: 'privateCloudName',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.privateCloudName}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Cloud Name',
      selector: 'cloudName',
      sortable: true,
      minWidth: '180px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate ml-1'>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudName}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Owner Name',
      selector: 'cloudOwnerName',
      sortable: true,
      minWidth: '180px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerName}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Address 1',
      selector: 'cloudOwnerLocationAddress1',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '150px' }}>{row.cloudOwnerLocationAddress1}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Address 2',
      selector: 'cloudOwnerLocationAddress2',
      sortable: true,
      minWidth: '200px',
      omit: address2,
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerLocationAddress2}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Address 3',
      selector: 'cloudOwnerLocationAddress3',
      sortable: true,
      minWidth: '200px',
      omit: address3,
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerLocationAddress3}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Owner City',
      selector: 'cloudOwnerCity',
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerCity}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Owner Pincode',
      selector: 'cloudOwnerCityPincode',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerCityPincode}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'State',
      selector: 'cloudOwnerState',
      sortable: true,
      minWidth: '150px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerState}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Owner Country',
      selector: 'cloudOwnerCountry',
      sortable: true,
      minWidth: '190px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerCountry}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Country Code',
      selector: 'cloudOwnerCountryCode',
      sortable: true,
      minWidth: '180px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerCountryCode}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Primary Phone',
      selector: 'cloudOwnerPrimaryPhone',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerPrimaryPhone}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Secondary Phone',
      selector: 'cloudOwnerSecondaryPhone',
      sortable: true,
      minWidth: '200px',
      omit: secondaryphone,
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerSecondaryPhone}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Primary Email',
      selector: 'cloudOwnerPrimaryEmail',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerPrimaryEmail}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Secondary Email',
      selector: 'cloudOwnerSecondaryEmail',
      sortable: true,
      minWidth: '200px',
      omit: secondaryemail,
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate'>{row.cloudOwnerSecondaryEmail}</span>
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
          <div className='d-flex' style={{ cursor: 'pointer' }}>
            <div tag='a' className='w-100'
              onClick={() => {
                handleUpdateModal()
                setIscTechCategoryName(row)
                console.log(isctechcategoryname)
              }}>
              <Edit size={15} />
            </div>
            <div tag='a' className='w-100' onClick={() => removeData(row.cloudMasterId)}>
              <Trash size={15} />
            </div>
            {/* <Edit size={15} /> */}
          </div>
        )
      }
    }
  ]

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.cloudName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.cloudType.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.cloudName.toLowerCase().includes(value.toLowerCase()) ||
          item.cloudType.toLowerCase().includes(value.toLowerCase())

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

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Cloud Master Details' breadCrumbParent='Cloud' breadCrumbActive='Cloud Master Details' />
      <Row className={classes.root}>
        <Col xs={xs} className={Clsx(classes.content, { [classes.contentShift]: open })}>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
              {/* <CardTitle tag="h4" style={{ color: 'white' }}>Cloud Master Details</CardTitle> */}
              <Col className='justify-content-left'>
                <InputGroup className='input-group-merge mb-2 mt-1'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <Search size={20} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='search cloud'
                    id='search-input'
                    value={searchValue}
                    onChange={handleFilter}
                    className='dataTable-filter'
                    type='text'
                    bsSize='18'
                  />
                </InputGroup>
              </Col>
              <div className="d-flex mt-md-0 mt-1 pt-1">
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
                      <FilePlus size={15} />
                      <span className="align-middle ml-50">CSV</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
                {/* Setting Compeonent */}
                <SettingButton
                  stateaddress2={stateaddress2}
                  caseaddress2={caseaddress2}
                  stateaddress3={stateaddress3}
                  caseaddress3={caseaddress3}
                  statesecondaryemail={statesecondaryemail}
                  casesecondaryemail={casesecondaryemail}
                  statesecondaryphone={statesecondaryphone}
                  casesecondaryphone={casesecondaryphone}
                />
              </div>
            </CardHeader>
            <DataTable
              noHeader
              pagination
              columns={columns}
              expandOnRowClicked
              paginationPerPage={7}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : data}
              highlightOnHover
              // pointerOnHover
              // onRowClicked={() => handleDrawer()}
              progressPending={pending}
              progressComponent={<SkeletonLoading />}
            />
          </Card>
        </Col>
        <Col>
          <DrawerRight
            handleDrawer={handleDrawer}
            open={open}
            data={<Data sliderdata={sliderdata} />}
          />
        </Col>
      </Row>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        fetchData={fetchData}
      />
      <UpdateModal
        open={update}
        handleUpdateModal={handleUpdateModal}
        value={isctechcategoryname}
        fetchData={fetchData}
      />
    </Fragment>
  )
}

export default DataTableWithButtons
