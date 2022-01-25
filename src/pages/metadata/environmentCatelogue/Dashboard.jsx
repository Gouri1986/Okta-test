import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./style.scss"
import { getTableData } from "../../../shared/apis/table/table"
import { encsDrawer } from "../../../shared/utils/drawer"
import {
  getApiEndpointNameFromRoutes,
  getTableTitleNameFromRoutes
} from "../../../shared/utils/getApiEndpointFromRoutes"
import { useSelector } from "react-redux"
import { getSpacedDisplayName } from "../../../shared/utils/table"
import { MetadataLayout } from "../../../shared/layout"
import { Table, Pagination } from "../../../shared/components/common"

const Dashboard = () => {
  const { user } = useSelector(state => state.userReducer)
  const [tableContents, setTableContents] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [report, showReport] = useState(false)
  const [activeEndPoint, setActiveEndPoint] = useState("")
  const [refresh, setRefresh] = useState(false)
  const location = useLocation()
  const [tableTitle, setTableTitle] = useState("")
  useEffect(() => {
    let endpointFromPath = getApiEndpointNameFromRoutes(encsDrawer, location, "environmentcatelogue/")
    if (endpointFromPath) {
      getTable(endpointFromPath)
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint)
    }
    setTableTitle(getTableTitleNameFromRoutes(encsDrawer, location, "environmentcatelogue/"))
  }, [refresh, location.pathname])
  const getTable = async activeEndPoint => {
    const data = await getTableData(activeEndPoint, user)
    const objectKeys = data?.map(e => {
      return Object.keys(e)
    })
    const header = objectKeys?.[0]?.map(el => {
      return { title: getSpacedDisplayName(el), id: el }
    })
    data && setTableContents({ header, data })
  }
  const onRowClick = rowData => {
    if (selectedRow.find(e => e.id === rowData.id)) {
      const selectedItems = selectedRow.filter(e => e.id !== rowData.id)
      setSelectedRow(selectedItems)
      console.log(rowData)
    } else {
      setSelectedRow([rowData, ...selectedRow])
      console.log(rowData)
    }
  }

  const [page, setPage] = useState(0) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  // change the pagination state after new table is rendered
  useEffect(() => {
    setPage(0)
    setRowsPerPage(10)
  }, [tableContents]);


  return (
    <MetadataLayout
      setActiveEndPoint={setActiveEndPoint}
      setRefresh={setRefresh}
      refresh={refresh}
      getTable={getTable}
      report={report}
      showReport={showReport}
      tableData={tableContents}
      tableTitle={tableTitle}
    >
      {tableContents.data?.length > 0 && (
        <Table
          report={report}
          selectedRow={selectedRow}
          onRowClick={onRowClick}
          tableData={tableContents}
          setTableContents={setTableContents}
          showCheckBox
          showAction
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
      <Pagination
        dataCount={tableContents.data?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </MetadataLayout>
  )
}
export default Dashboard
