import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./iam.scss";
import TitanTable from "../../shared/components/common/tableContainer/table/Table";
import { useSelector } from "react-redux";
import { getSpacedDisplayName } from "../../shared/utils/table";
import {
  getApiEndpointNameFromRoutes,
  getTableDetailFromRoutes,
  getTableTitleNameFromRoutes,
} from "../../shared/utils/getApiEndpointFromRoutes";
import { MetadataLayout } from "../../shared/layout";
import { iamDrawer } from "../../shared/utils/drawer";
import { PaginationDepricated } from "../../shared/components/common";
import { IAMRoutes } from "../../routes/metadataRoutes";
import { getTableData } from "../../shared/apis/table/table";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  // Data to be populated with Filtered Columns
  const [tableContents, setTableContents] = useState([]);
  // Search Value
  // Data to be filled with selected Rows(Checked)
  const [selectedRow, setSelectedRow] = useState([]);
  const [report, showReport] = useState(false);
  const [activeEndPoint, setActiveEndPoint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const [tableDetails, setTableDetails] = useState({});
  const [tableTitle, setTableTitle] = useState("");
  const baseUrl = process.env.REACT_APP_IAM_BASE_URL;

  useEffect(() => {
    let endpointFromPath = getApiEndpointNameFromRoutes(
      iamDrawer,
      location,
      "iam/"
    );
    if (endpointFromPath) {
      getTable(endpointFromPath);
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint);
    }
    setTableTitle(getTableTitleNameFromRoutes(iamDrawer, location, "iam/"));

    let tableDetail = getTableDetailFromRoutes(IAMRoutes, location, "iam/");
    setTableDetails(tableDetail);
  }, [refresh, location.pathname]);

  const getTable = async (activeEndPoint) => {
    const path = `${baseUrl}${activeEndPoint}`;
    const data = await getTableData(path, user);
    const objectKeys = data?.map((e) => {
      return Object.keys(e);
    });
    const header = objectKeys?.[0]?.map((el) => {
      return { title: getSpacedDisplayName(el), id: el };
    });
    data && setTableContents({ header, data });
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(
    Math.ceil(tableContents.data?.length / rowsPerPage)
  );

  // state for the visibility of crud modal
  const [openCRUDModal, setOpenCRUDModal] = useState(false);
  const [CRUDModalType, setCRUDModalType] = useState("add");

  const layoutProps = {
    setRefresh,
    refresh,
    getTable,
    report,
    showReport,
    tableData: tableContents,
    tableTitle,
    drawer: iamDrawer,
    openCRUDModal,
    setOpenCRUDModal,
    CRUDModalType,
    setCRUDModalType,
    setActiveEndPoint,
    pageTitle: "IAM",
    baseUrl,
  };

  const tableProps = {
    selectedRow,
    tableData: tableContents,
    tableDetails,
    setTableContents,
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
    activeEndPoint,
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
    jumpPageVisibility: true, // show the jump to page option
  };

  return (
    <MetadataLayout {...layoutProps}>
      <TitanTable {...tableProps} />
      <PaginationDepricated {...paginationProps} />
    </MetadataLayout>
  );
};

export default Dashboard;
