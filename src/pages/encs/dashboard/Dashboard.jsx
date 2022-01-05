import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import ComplianceHeader from "../../scos/ComplianceReport/GCP-Compliance/ComplianceHeader";
import ComplienceIntro from "../../scos/ComplianceReport/GCP-Compliance/ComplienceIntro";
import "../../../components/common/calender/pickers/flatpickr.scss";
import Download from "../../../components/common/tableContainer/download/Download";
import Navbar from "../../../components/common/drawer/navDrawer/NavDrawer";
import { Filter } from "../../../components/common/tableContainer/filter";
import { ReportDrawer } from "../../../components/common/drawer/reportDrawer";
import { TitanSearch } from "../../../components/common/search";
import TitanTable from "../../../components/common/tableContainer/table/Table";
import { tableData } from "../../../components/db";
import { FilterDrawer } from "../../../components/common/drawer/filterDrawer";
import { ColumnSettings } from "../../../components/common/tableContainer/columnSettings";
import { Refresh } from "../../../components/common/tableContainer/refresh";
import { Pagination } from "../../../components/common/tableContainer/pagination";
import { getTableData } from "../../../apis/table/table";
import { encsDrawer } from "../../../components/common/drawer/navDrawer/utils";
import { getApiEndpointNameFromRoutes } from "../../../utils";
import { useSelector } from "react-redux";

// Import The components Here

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  // Data to be populated with Filtered Columns
  const [tableContents, setTableContents] = useState([]);
  // Search Value
  const [searchValue, setSearchValue] = useState("");
  // Data to be filled with selected Rows(Checked)
  const [selectedRow, setSelectedRow] = useState([]);
  const [report, showReport] = useState(false);
  const [filterDrawer, showFilterDrawer] = useState(false);
  const [searchClicked, isSearchClicked] = useState(false);
  const [activeEndPoint, setActiveEndPoint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (searchValue) {
      setTableContents({
        ...tableData,
        data: tableData.data.filter((e) =>
          e["service-type"].toLowerCase().includes(searchValue.toLowerCase())
        ),
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (getApiEndpointNameFromRoutes(encsDrawer, location)) {
      getTable(getApiEndpointNameFromRoutes(encsDrawer, location));
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint);
    }
  }, [refresh, location.pathname]);

  const onRowClick = (rowData) => {
    if (selectedRow.find((e) => e.id === rowData.id)) {
      const selectedItems = selectedRow.filter((e) => e.id !== rowData.id);
      setSelectedRow(selectedItems);
      showReport(false);
      selectedRow.length === 2 && showReport(true);
    } else {
      setSelectedRow([rowData]);
      // selectedRow.length > 0 ? showReport(false) :
      !report && showReport(true);
    }
  };

  const getDisplayName = (s) =>
    s.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });

  const getTable = async (activeEndPoint) => {
    const data = await getTableData(activeEndPoint, user);
    const objectKeys = data?.map((e) => {
      return Object.keys(e);
    });
    const header = objectKeys?.[0]?.map((el) => {
      return { title: getDisplayName(el), id: el };
    });
    data && setTableContents({ header, data });
  };

  return (
    <div className='flex-r width100'>
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className='main-ly width100 height100vh pl-20 pr-20 flex-c overflow-x-scroll overflow-y-scroll'>
        <div className='ml-25'>
          <ComplianceHeader />
        </div>
        <div className='mt-20'>
          <ComplienceIntro />
        </div>
        <div>
          <div className='table-option-header mt-30 bg-lightgrey flex-r-ac flex-jc-sp-btn'>
            <div className='table-filter-wrapper ml-10'>
              {/* <Filter
                showReport={showReport}
                filterDrawer={filterDrawer}
                showFilterDrawer={showFilterDrawer}
                setTableContents={setTableContents}
                tableData={tableContents}
              /> */}
            </div>
            <div className='flex-r-ac'>
              <div
                onClick={() => {
                  isSearchClicked(true);
                }}
                className={
                  searchClicked
                    ? "titan-searchbar-container-expanded height100 m-15"
                    : "titan-searchbar-container m-15"
                }
              >
                <TitanSearch
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  isSearchClicked={isSearchClicked}
                  searchClicked={searchClicked}
                  tableData={tableContents}
                />
              </div>
              <div className='m-15'>
                <Refresh />
              </div>
              {/* <div className='m-15'>
                <ColumnSettings
                  tableData={tableData}
                  setTableContents={setTableContents}
                />
              </div> */}
              <div className='m-15'>
                <Download
                  selectedRow={selectedRow}
                  tableContents={tableContents}
                />
              </div>
            </div>
          </div>
          <div
            className='table-parent overflow-x-auto overflow-y-scroll width100'
            style={{ height: "75%" }}
          >
            <TitanTable
              report={report}
              showFilterDrawer={showFilterDrawer}
              selectedRow={selectedRow}
              onRowClick={onRowClick}
              tableData={tableContents}
              setTableContents={setTableContents}
              status={true}
            />
          </div>
          <div className='bg-w flex-r-ac pt-10 pb-10 pagination-holder'>
            <div className='pagination-wrapper'>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReportDrawer
          filterDrawer={filterDrawer}
          report={report}
          showReport={showReport}
        />
      </div>
      <div>
        <FilterDrawer
          report={report}
          filterDrawer={filterDrawer}
          showFilterDrawer={showFilterDrawer}
          setTableContents={setTableContents}
          tableData={tableContents}
        />
      </div>
    </div>
  );
};

export default Dashboard;
