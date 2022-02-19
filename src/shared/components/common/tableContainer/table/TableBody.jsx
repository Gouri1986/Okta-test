import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

/**
 * ? Miscillaneous  resusable function $ assets imports
 * TODO: Add all the above metioned here
 **/
import { getSanitisedTableData } from "../../../../utils/table"
import { PencilIcon, TrashIcon } from "./assets"
import { kebabCaseDate } from "../../../../utils/misc"

/**
 * ? Resusable component for rendering table row
 **/
import RightDrawer from "../../drawer/complianceDrawer/RightDrawer"
import Modal from "../../modal/center/Modal"
import ModalForm from "../../forms/ModalForm"
import InlineStatusBarChart from "../../charts/TableInlineBarStatus"
import ComplianceViewButton from "./columnButtons/ComplianceViewButton"

/**
 * ? API Calls
 **/
import { getDrawerData, getDrawerRegulationData } from "../../../../apis/drawer/drawer"
import { deleteTableData } from "../../../../apis/table/table"

/**
 * ? Global redux state
 **/
import { DrawerDataHeader, DrawerDataBody } from "../../drawer/complianceDrawer/complianceDrawerData"
import {
  setComplianceDrawerExpand,
  setNavDrawerExpand,
  setFilterDrawerExpand
} from "../../../../../redux/common/commonActions"
import { setDrawerRegulationData } from "../../../../../redux/drawer/drawerActions"

const RowAction = ({
  baseUrl,
  setOpenCRUDModal,
  setCRUDModalType,
  activeEndPoint,
  datum,
  setActiveData,
  getTable
}) => {
  const { user } = useSelector(state => state.userReducer)

  const deleteDataFromTable = async e => {
    e.preventDefault()
    e.stopPropagation()
    await deleteTableData(baseUrl + activeEndPoint, user, datum)
    getTable(activeEndPoint)
  }

  return (
    <div className="flex-r-jc-ac t-20">
      <div className="cp" onClick={deleteDataFromTable}>
        <TrashIcon />
      </div>
      <div
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setCRUDModalType("update")
          setOpenCRUDModal(true)
          setActiveData(datum)
        }}
        className="ml-15 cp"
      >
        <PencilIcon />
      </div>
    </div>
  )
}

const RowCheckBox = ({ selectedRow, datum, tableRowkey }) => {
  const checked = selectedRow.find(e => e[tableRowkey] === datum[tableRowkey])

  return (
    <div class=" cp table-checkbox-input-container">
      <input type="checkbox" checked={checked} />
      <span class="h-15 w-15 checkmark"></span>
    </div>
  )
}

const TableBody = props => {
  const {
    tableData,
    rowData = [],
    header = [],
    onRowClick,
    selectedRow,
    tableRowkey,
    tableDetails,
    page,
    rowsPerPage,
    tableTitle,
    openCRUDModal,
    setOpenCRUDModal,
    CRUDModalType,
    setCRUDModalType,
    activeEndPoint,
    getTable,
    baseUrl,
    complianceDrawerExpanded,
    disableRowclick
  } = props

  const dispatch = useDispatch()

  //state to manage data to be displayed in right side modal
  const [activeData, setActiveData] = useState({})
  const [rowDataToDisplay, setRowDataToDisplay] = useState({})
  // complaince drawer data
  const [drawerData, setDrawerData] = useState([])
  const [resourcesId, setResourcseIds] = useState([])
  const [complainceDrawerType, setcomplainceDrawerType] = useState("")
  const { complainceDrawerData } = useSelector(state => state.drawerReducer)

  /***************************************************************
   *          Pagination Data Slicing Logic
   * *************************************************************
   ------------------ Logic explained ----------------------------
        ** 1. Intial page count = 1          
        page count = 1 --->  slice 0 to 9  [ (1-1 x 10) to (1 * 10) - 1 ]
        page count = 2 --->  slice 10 to 19  [ (2-1 x 10) to (2 * 10) - 1 ]
  */
  const start = (page - 1) * rowsPerPage
  const end = page * rowsPerPage
  const tableRowData = rowData.slice(start, end)
  //****************************************************************/
  /**
   * rowData fetched from table api
   * pass an empty array [] incase of undefined
   * slice the data based on the page selected
   */

  const TableRowCell = ({ item = {}, datum }) => {
    // destructuring the current cloumn's id and display title
    const { id, title } = item
    /**
     * width of the column
     * @returns static width conditionally depends on the length of column's display name's length
     */
    const getRowCellWidth = () =>
      rowData.find(e => e[id]?.length > 30)
        ? 400
        : title?.length > 25
        ? 400
        : title?.length > 20
        ? 300
        : title?.length === 0
        ? 50
        : 200

    const rowCellClassName = `bdr-primary table-cell p-15 w-${getRowCellWidth()} ${
      item.id === "action" || item.id === "resources" || item.id === "regulationControls"
    }`

    return (
      <td className={rowCellClassName}>
        {/* action buttons column is rendred conditionally 
        if id of the cloumn being rendered matches with "action" */}
        {id === "action" ? (
          <RowAction
            setOpenCRUDModal={setOpenCRUDModal}
            setCRUDModalType={setCRUDModalType}
            activeEndPoint={activeEndPoint}
            datum={datum}
            setActiveData={setActiveData}
            getTable={getTable}
            baseUrl={baseUrl}
          />
        ) : /*action buttons column is rendred conditionally
        //if id of the cloumn being rendered matches with "action"*/
        id === "cb" ? (
          <RowCheckBox
            onRowClick={() => onRowClick(datum)}
            selectedRow={selectedRow}
            datum={datum}
            tableRowkey={tableRowkey}
            setActiveData={setActiveData}
          />
        ) : id === "descriptiveComplainceStatus" ? (
          <div className="flex-c-ac">
            <InlineStatusBarChart
              value1={datum[id]?.[0]?.Pass}
              value2={datum[id]?.[0]?.Fail}
              onClick={() => {
                let paramsKey = {}
                tableDetails?.complainceDetails?.params?.paramKey?.forEach((v, i) => {
                  paramsKey[v] = datum[tableDetails?.complainceDetails?.params?.tableKey?.[i]]
                })
                dispatch(
                  getDrawerData(
                    `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}${tableDetails?.complainceDetails?.apiEndpoint}`,
                    paramsKey
                  )
                )
                setDrawerData(datum)
                dispatch(setComplianceDrawerExpand(true))
                dispatch(setNavDrawerExpand(false))
                dispatch(setFilterDrawerExpand(false))
                setcomplainceDrawerType("Resources")
              }}
            />
            <span className="fw-500 mt-5 f-12 lh-1.8">
              {datum[id]?.[0]?.Pass}/{datum[id]?.[0]?.Pass + datum[id]?.[0]?.Fail} Passed
            </span>
          </div>
        ) : id === "lastVerifiedDate" ? (
          <span>{kebabCaseDate(datum[id])}</span>
        ) : id === "resources" ? (
          <ComplianceViewButton dark />
        ) : id === "regulationControls" ? (
          <ComplianceViewButton
            onClick={() => {
              dispatch(setComplianceDrawerExpand(true))
              dispatch(setNavDrawerExpand(false))
              dispatch(setFilterDrawerExpand(false))
              setDrawerData(datum)
              setcomplainceDrawerType("Regulation")
              dispatch(
                getDrawerRegulationData(
                  `${process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL}recs-oci-controls-regulation-map-controlItemId`,
                  { controlItemId: datum.controlId }
                )
              )
            }}
          />
        ) : (
          // else return normal row data
          <span title={datum[id]?.length > 100 && datum[id]} className={"table-data-cell"}>
            {datum[id]?.length > 100 ? datum[id]?.substr(0, 100) + "..." : datum[id]}
          </span>
        )}
      </td>
    )
  }

  const TableRow = ({ datum }) => {
    const rowClick = () => {
      if (!disableRowclick) {
        const checked = selectedRow.find(e => e[tableRowkey] === datum[tableRowkey])
        if (!checked) {
          onRowClick(datum)
          setActiveData(datum)
          dispatch(setComplianceDrawerExpand(true))
        } else {
          onRowClick({})
          setActiveData({})
          dispatch(setComplianceDrawerExpand(false))
        }
      }
    }

    return (
      <tr
        onClick={rowClick}
        className={`pos-rel flex-jc-sp-evn titan-table-rows bdr-buttom-primary-1 pt-10 pb-10 cp`}
      >
        {header?.map(item => (
          <TableRowCell item={item} datum={datum} />
        ))}
      </tr>
    )
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage)

  useEffect(() => {
    setResourcseIds(complainceDrawerData[0]?.json_agg)
  }, [complainceDrawerData])

  console.log("activeData", activeData)
  return (
    <div className="flex-c ">
      {tableRowData?.map(datum => (
        <TableRow datum={datum} />
      ))}
      {/* {emptyRows > 0 ?? (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={header.length} />
            </tr>
          )} */}
      <RightDrawer
        open={complianceDrawerExpanded}
        size="sm" // sm, md, lg, xl
        data={activeData}
      >
        <DrawerDataHeader
          serviceType={tableDetails?.sectionType}
          tableTitle={`${tableTitle} Report`}
          headerColoumn={tableDetails?.complainceDetails?.dawerHeaderColoumn}
          headerData={drawerData}
          close={() => {
            dispatch(setComplianceDrawerExpand(false))
            dispatch(setDrawerRegulationData([]))
            setResourcseIds([])
            setDrawerData({})
            setDrawerRegulationData([])
          }}
        />
        <DrawerDataBody
          data={drawerData}
          type={complainceDrawerType}
          headerData={drawerData}
          resourcesId={resourcesId}
          tableDetails={tableDetails}
        />
      </RightDrawer>
      <Modal
        open={openCRUDModal}
        close={() => setOpenCRUDModal(false)}
        size={`${
          tableData.header?.length < 10
            ? `sm`
            : tableData.header?.length < 15
            ? `md`
            : tableData.header?.length < 30
            ? `lg`
            : tableData.header?.length > 30
            ? `xl`
            : ""
        }`} // sm, md, lg, xl
        columnCount={tableData.header?.length}
        modalTitle={tableTitle}
      >
        <ModalForm
          form={getSanitisedTableData(tableData, tableDetails)}
          tableDetails={tableDetails}
          onCancel={() => setOpenCRUDModal(false)}
          activeEndPoint={activeEndPoint}
          getTable={getTable}
          CRUDModalType={CRUDModalType}
          openCRUDModal={openCRUDModal}
          activeData={activeData}
          baseUrl={baseUrl}
        />
      </Modal>
    </div>
  )
}

export default TableBody
