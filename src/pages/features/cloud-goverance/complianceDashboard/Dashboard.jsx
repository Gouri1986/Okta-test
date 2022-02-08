import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTableData } from "../../../../shared/apis/table/table";
import {
  getApiEndpointNameFromRoutes,
  getTableDetailFromRoutes,
  getTableKeyNameFromRoutes,
  getTableTitleNameFromRoutes,
} from "../../../../shared/utils/getApiEndpointFromRoutes";
import { useDispatch, useSelector } from "react-redux";
import { MetadataLayout } from "../../../../shared/layout";
import "./style.scss";
import { Table, Pagination } from "../../../../shared/components/common";
import { complianceDashboardDrawer } from "../../../../shared/utils/drawer";
import complianceDashboardRoutes from "../../../../routes/featureRoutes/complianceDashboard";
const Dashboard = () => {
  // loggin user details from store
  const dispatch = useDispatch();

  const { activeEndpoint, tableContents } = useSelector(
    (state) => state.tableReducer
  );
  // table title returned from the routes with respect to the url path
  const [tableTitle, setTableTitle] = useState("");
  // table details
  const [tableDetails, setTableDetails] = useState({});
  // key for the table row
  const [tableRowkey, setTableRowKey] = useState("");
  // checked table row
  const [selectedRow, setSelectedRow] = useState([]);

  // refresh the table
  const [refresh, setRefresh] = useState(false);
  // location hook to get the location variables
  const location = useLocation();
  //BASE URL of api
  const baseUrl = process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL;

  useEffect(() => {
    /**
     * getting the correct endpoint from routes to fetch table data
     * we are passing drawer | location | path
     */

    let endpointFromPath = getApiEndpointNameFromRoutes(
      complianceDashboardDrawer,
      location,
      "compliance-dashboard/"
    );
    /**
     * in the same way, getting the correct title of the table from routes
     * we are passing drawer | location | path
     */

    let tableTitle = getTableTitleNameFromRoutes(
      complianceDashboardDrawer,
      location,
      "compliance-dashboard/"
    );

    // get table detail from routes

    let tableDetail = getTableDetailFromRoutes(
      complianceDashboardDrawer,
      location,
      "compliance-dashboard/"
    );
    setTableDetails(tableDetail);

    // get the key for the table for crud or any other row level operation
    let tableKey = getTableKeyNameFromRoutes(
      complianceDashboardDrawer,
      location,
      "compliance-dashboard/"
    );

    console.log(tableTitle, tableKey, tableDetail);

    setTableRowKey(tableKey);

    /**
     * getting the actual endpoint if defined else try get from the state
     * check for undefined - chances for undefined endpoint with wrong sub path
     */

    if (endpointFromPath) {
      getTable(endpointFromPath);
    } else {
      activeEndpoint.length > 0 && getTable(activeEndpoint);
    }
    // set the table title
    setTableTitle(tableTitle);

    // dependency array
  }, [location.pathname]);

  const getTable = async (activeEndPoint) => {
    const path = `${baseUrl}${activeEndPoint}`;
    dispatch(getTableData(path));
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(
    Math.ceil(tableContents.data?.length / rowsPerPage)
  );
  // state for the visibility of crud modal
  const [openCRUDModal, setOpenCRUDModal] = useState(false);
  const [CRUDModalType, setCRUDModalType] = useState("add");

  const onRowClick = (rowData) => {
    if (selectedRow.find((e) => e[tableRowkey] === rowData[tableRowkey])) {
      const selectedItems = selectedRow.filter(
        (e) => e[tableRowkey] !== rowData[tableRowkey]
      );
      setSelectedRow(selectedItems);
    } else {
      setSelectedRow([rowData]);
    }
  };

  const layoutProps = {
    tableData: tableContents,
    tableTitle,
    drawer: complianceDashboardDrawer,
    openCRUDModal,
    setOpenCRUDModal,
    pageTitle: "Compliance Dashboard",
    CRUDModalType,
    setCRUDModalType,
  };

  const tableProps = {
    selectedRow: selectedRow,
    onRowClick: onRowClick,
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
  };

  const paginationProps = {
    dataCount: tableContents.data?.length, // total data count
    page, // current page
    setPage, //state for the page number to be set
    rowsPerPage, // rows per page count
    setRowsPerPage, //state for the rows per page event
    pageCount, // total number of pages as per the data
    rowsPerPageData: [10, 25, 50, 100], // data for the row per page dropdown
    jumpPageVisibility: false, // show the jump to page option
  };

  return (
    <MetadataLayout {...layoutProps}>
      {tableContents.data?.length > 0 && <Table {...tableProps} />}
      <Pagination {...paginationProps} />
    </MetadataLayout>
  );
};
export default Dashboard;
