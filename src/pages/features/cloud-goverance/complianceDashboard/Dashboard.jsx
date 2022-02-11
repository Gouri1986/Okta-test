import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getTableData } from "../../../../shared/apis/table/table"
import { getTableDetailFromRoutes } from "../../../../shared/utils/getApiEndpointFromRoutes"
import { useDispatch, useSelector } from "react-redux"
import { MetadataLayout } from "../../../../shared/layout"
import "./style.scss"
import { Table, Pagination } from "../../../../shared/components/common"
import { complianceDashboardDrawer as drawer } from "../../../../shared/utils/drawer"
const Dashboard = () => {
  // loggin user details from store
  const dispatch = useDispatch()

  const { activeEndpoint, tableContents } = useSelector(state => state.tableReducer)

  const { complianceDrawerExpanded } = useSelector(state => state.commonReducer)

  // table title returned from the routes with respect to the url path
  const [tableTitle, setTableTitle] = useState("")
  // table details
  const [tableDetails, setTableDetails] = useState({})
  // key for the table row
  const [tableRowkey, setTableRowKey] = useState("")
  // checked table row
  const [selectedRow, setSelectedRow] = useState([])
  // location hook to get the location variables
  const location = useLocation()
  //BASE URL of api
  const baseUrl = process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL
  const paramsToFetchTableDetails = [drawer, location, "compliance-dashboard/"]

  useEffect(() => {
    // get table detail from routes
    let tableDetail = getTableDetailFromRoutes(...paramsToFetchTableDetails)
    setTableDetails(tableDetail)
    setTableRowKey(tableDetail?.key)
    setTableTitle(tableDetail?.title)
    const apiEndpoint = tableDetail?.apiEndpoint
    if (apiEndpoint) {
      getTable(apiEndpoint)
    } else {
      activeEndpoint.length > 0 && getTable(activeEndpoint)
    }
    // dependency array
  }, [location.pathname])

  const getTable = async activeEndPoint => {
    const path = `${baseUrl}${activeEndPoint}`
    dispatch(getTableData(path))
  }

  // pagination state init
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pageCount = Math.ceil(tableContents.data?.length / rowsPerPage)

  // pagination page count state change
  useEffect(() => {
    setPage(1)
  }, [tableContents])

  // state for the visibility of crud modal
  const [openCRUDModal, setOpenCRUDModal] = useState(false)
  const [CRUDModalType, setCRUDModalType] = useState("add")


  //state for the visiblity of right side modal
  const [openRightDescModal, setOpenRightDescModal] = useState(false)

  const onRowClick = rowData => {
    if (selectedRow.find(e => e[tableRowkey] === rowData[tableRowkey])) {
      const selectedItems = selectedRow.filter(e => e[tableRowkey] !== rowData[tableRowkey])
      setSelectedRow(selectedItems)
    } else {
      setSelectedRow([rowData])
    }
  }

  const layoutProps = {
    tableData: tableContents,
    tableTitle,
    drawer,
    openCRUDModal,
    setOpenCRUDModal,
    pageTitle: "Compliance Dashboard",
    CRUDModalType,
    setCRUDModalType,
    openRightDescModal
  }

  const tableProps = {
    selectedRow: selectedRow,
    onRowClick: onRowClick,
    disableRowclick: true,
    tableData: tableContents,
    tableRowkey,
    page,
    tableTitle,
    tableDetails,
    rowsPerPage,
    openCRUDModal,
    setOpenCRUDModal,
    activeEndpoint,
    getTable,
    baseUrl,
    CRUDModalType,
    setCRUDModalType,
    complianceDrawerExpanded,
  }

  const paginationProps = {
    dataCount: tableContents.data?.length, // total data count
    page, // current page
    setPage, //state for the page number to be set
    rowsPerPage, // rows per page count
    setRowsPerPage, //state for the rows per page event
    pageCount, // total number of pages as per the data
    rowsPerPageData: [10, 25, 50, 100], // data for the row per page dropdown
    jumpPageVisibility: false // show the jump to page option
  }

  return (
    <MetadataLayout {...layoutProps}>
      {tableContents.data?.length > 0 && <Table {...tableProps} />}
      <Pagination {...paginationProps} />
    </MetadataLayout>
  )
}
export default Dashboard
