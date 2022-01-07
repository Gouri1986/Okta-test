// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react"

// ** Table Data & Columns
import Data, { } from "./data"

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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-oci-app-res-partition-ad`,
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/encs-oci-app-res-partition-ad`,
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

  const removeData = (ociAppResPartitionAdId) => {
    const DeletePassFunction = (data) => {
      const deletevar = data
      console.log("deletevar = ", deletevar)
      axios.delete(`${process.env.REACT_APP_URL}/api/v1/encs-oci-app-res-partition-ad`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": `${token}`
          },
          data: { ociAppResPartitionAdId: deletevar }
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
    handleConfirmText(ociAppResPartitionAdId, { DeletePassFunction })
  }
  //-----------------------------------------Delete method End----------------------------------------------------------------------

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
      name: 'OCI Resource Partition AD ',
      selector: 'ociResPartitionAdId',
      sortable: true,
      minWidth: '290px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '200px' }}>{row.ociResPartitionAdId}</span>
            {/* <small>{row.post}</small> */}
          </div>
        </div>
      )
    },
    {
      name: 'Application Sub Partition',
      selector: 'app_sub_partitionName',
      sortable: true,
      minWidth: '250px',
      cell: row => (
        <div className='d-flex align-items-center'>
          <div className='user-info text-truncate '>
            <span className='d-block font-weight-bold text-truncate' style={{ width: '200px' }}>{row.app_sub_partitionName}</span>
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

            <div tag='a' className='w-100' onClick={() => removeData(row.ociAppResPartitionAdId)}>
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
        try {
          const startsWith =
            item.ociResPartitionAdId.toLowerCase().startsWith(value.toLowerCase()) ||
            item.app_sub_partitionName.toLowerCase().startsWith(value.toLowerCase())

          const includes =
            item.ociResPartitionAdId.toLowerCase().includes(value.toLowerCase()) ||
            item.app_sub_partitionName.toLowerCase().includes(value.toLowerCase())

          if (startsWith) {
            return startsWith
          } else if (!startsWith && includes) {
            return includes
          } else return null
        } catch (error) {
          console.log(error)
        }
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
      <Breadcrumbs breadCrumbTitle='App Respartition AD Details' breadCrumbParent='Oracle Cloud' breadCrumbActive='App Respartition AD Details' />
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
                <SettingButton />
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
