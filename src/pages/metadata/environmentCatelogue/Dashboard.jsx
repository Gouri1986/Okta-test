import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import Table from "../../../shared/components/common/tableContainer/table/Table";
import { getTableData } from "../../../shared/apis/table/table";
import { encsDrawer } from "../../../shared/utils/drawer";
import { getApiEndpointNameFromRoutes } from "../../../shared/utils/getApiEndpointFromRoutes";
import { useSelector } from "react-redux";
import { getSpacedDisplayName } from "../../../shared/utils/table";
import { MetadataLayout } from "../../../shared/layout";
import TreeView from "../../../shared/components/common/treeView/TreeView.jsx"

const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);

  const [tableContents, setTableContents] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [report, showReport] = useState(false);
  const [activeEndPoint, setActiveEndPoint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      getApiEndpointNameFromRoutes(
        encsDrawer,
        location,
        "environmentcatelogue/"
      )
    ) {
      getTable(
        getApiEndpointNameFromRoutes(
          encsDrawer,
          location,
          "environmentcatelogue/"
        )
      );
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

  const getTable = async (activeEndPoint) => {
    const data = await getTableData(activeEndPoint, user);
    const objectKeys = data?.map((e) => {
      return Object.keys(e);
    });
    const header = objectKeys?.[0]?.map((el) => {
      return { title: getSpacedDisplayName(el), id: el };
    });
    data && setTableContents({ header, data });
  };

  return (
    <MetadataLayout
      setActiveEndPoint={setActiveEndPoint}
      setRefresh={setRefresh}
      refresh={refresh}
      getTable={getTable}
      report={report}
      showReport={showReport}
    >
      <TreeView />
      <Table
        report={report}
        selectedRow={selectedRow}
        onRowClick={onRowClick}
        tableData={tableContents}
        setTableContents={setTableContents}
        status={true}
      />
    </MetadataLayout>
  );
};

export default Dashboard;
