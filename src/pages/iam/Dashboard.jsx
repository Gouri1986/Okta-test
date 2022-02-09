import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./iam.scss";
import TitanTable from "../../shared/components/common/tableContainer/table/Table";
import { Pagination } from "../../shared/components/common";
import { useDispatch, useSelector } from "react-redux";
import { getTableDetailFromRoutes } from "../../shared/utils/getApiEndpointFromRoutes";
import { MetadataLayout } from "../../shared/layout";
import { iamDrawer as drawer } from "../../shared/utils/drawer";
import { getTableData } from "../../shared/apis/table/table";

const Dashboard = () => {
  const dispatch = useDispatch();
  // active api endpoint to fetch table data with respect to the url path
  const { activeEndpoint, tableContents } = useSelector(
    (state) => state.tableReducer
  );
  //table data fetched from api
  // table title returned from the routes with respect to the url path
  const [tableTitle, setTableTitle] = useState("");
  // table details
  const [tableDetails, setTableDetails] = useState({});
  // key for the table row
  const [tableRowkey, setTableRowKey] = useState("");
  // checked table row
  const [selectedRow, setSelectedRow] = useState([]);
  // location hook to get the location variables
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_IAM_BASE_URL;
  const paramsToFetchTableDetails = [drawer, location, "iam/"];

  useEffect(() => {
    let tableDetail = getTableDetailFromRoutes(...paramsToFetchTableDetails);
    setTableDetails(tableDetail);
    setTableRowKey(tableDetail?.key);
    setTableTitle(tableDetail?.title);
    const apiEndpoint = tableDetail?.apiEndpoint;
    if (apiEndpoint) {
      getTable(apiEndpoint);
    } else {
      activeEndpoint.length > 0 && getTable(activeEndpoint);
    }
    // dependency array
  }, [location.pathname]);

  const getTable = async (activeEndPoint) => {
    const path = `${baseUrl}${activeEndPoint}`;
    dispatch(getTableData(path));
  };

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

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(tableContents.data?.length / rowsPerPage);

  // state for the visibility of crud modal
  const [openCRUDModal, setOpenCRUDModal] = useState(false);
  const [CRUDModalType, setCRUDModalType] = useState("add");

  const layoutProps = {
    tableData: tableContents,
    tableTitle,
    drawer,
    openCRUDModal,
    setOpenCRUDModal,
    CRUDModalType,
    setCRUDModalType,
    pageTitle: "IAM",
    baseUrl,
  };

  const tableProps = {
    selectedRow,
    tableData: tableContents,
    onRowClick,
    tableDetails,
    showCheckBox: true,
    tableTitle,
    showAction: true,
    page,
    rowsPerPage,
    openCRUDModal,
    setOpenCRUDModal,
    CRUDModalType,
    setCRUDModalType,
    activeEndpoint,
    getTable,
    baseUrl,
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
      <TitanTable {...tableProps} />
      <Pagination {...paginationProps} />
    </MetadataLayout>
  );
};

export default Dashboard;
