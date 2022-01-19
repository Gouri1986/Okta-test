import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./style.scss"
import Table from "../../../shared/components/common/tableContainer/table/Table"
import { getTableData } from "../../../shared/apis/table/table"
import { encsDrawer } from "../../../shared/utils/drawer"
import { getApiEndpointNameFromRoutes } from "../../../shared/utils/getApiEndpointFromRoutes"
import { useSelector } from "react-redux"
import { getSpacedDisplayName } from "../../../shared/utils/table"
import { MetadataLayout } from "../../../shared/layout"

//Common components testing
import TreeView from "../../../shared/components/common/treeView/TreeView.jsx"
import { treeViewData } from "../../../shared/components/db"
import RangeSlider from "../../../shared/components/common/inputs/range/rangeSlider"
import BreadCumbs from "../../../shared/components/common/breadcumbs/BreadCumbs.jsx"
import ModalRight from "../../../shared/components/common/modal/right/ModalRight"

const Dashboard = () => {
  const { user } = useSelector(state => state.userReducer)

  const [tableContents, setTableContents] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [report, showReport] = useState(false)
  const [activeEndPoint, setActiveEndPoint] = useState("")
  const [refresh, setRefresh] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (getApiEndpointNameFromRoutes(encsDrawer, location, "environmentcatelogue/")) {
      getTable(getApiEndpointNameFromRoutes(encsDrawer, location, "environmentcatelogue/"))
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint)
    }
  }, [refresh, location.pathname])

  const onRowClick = rowData => {
    if (selectedRow.find(e => e.id === rowData.id)) {
      const selectedItems = selectedRow.filter(e => e.id !== rowData.id)
      setSelectedRow(selectedItems)
      showReport(false)
      selectedRow.length === 2 && showReport(true)
    } else {
      setSelectedRow([rowData])
      // selectedRow.length > 0 ? showReport(false) :
      !report && showReport(true)
    }
  }

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
  const [open, setOpen] = useState(false)

  return (
    <MetadataLayout
      setActiveEndPoint={setActiveEndPoint}
      setRefresh={setRefresh}
      refresh={refresh}
      getTable={getTable}
      report={report}
      showReport={showReport}
    >
      <button
        style={{
          width: "100px",
          height: "40px",
          cursor: "pointer"
        }}
        onClick={() => setOpen(!open)}
      >
       Modal Open
      </button>
      <ModalRight
        open={open}
        close={() => setOpen(false)}
        size="sm" // sm, md, lg, xl
        body={
          <>
            <BreadCumbs
              titleData={[
                {
                  type: "Parent",
                  title: "Dashboard",
                  link: "/dashboard"
                },
                {
                  type: "Parent",
                  title: "Meta Data",
                  link: "/metadata/environmentcatelogue"
                },
                {
                  type: "Child",
                  title: "Environment Catalogue"
                }
              ]}
            />
            <div className="w-200">
              <RangeSlider
                marks={[
                  {
                    value: 0,
                    label: "Low"
                  },
                  {
                    value: 50,
                    label: "Medium"
                  },
                  {
                    value: 100,
                    label: "High"
                  }
                ]} // slider marks with value and label
                defaultValue={0} // default value
                handleFunction={function handleFunction(value) {
                  console.log(value)
                }} // handleFunction
              />
            </div>
            <TreeView data={treeViewData} />
          </>
        }
      />
    </MetadataLayout>
  )
}

export default Dashboard
