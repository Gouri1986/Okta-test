import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";
import Table from "../../../shared/components/common/tableContainer/table/Table";
import { getTableData } from "../../../shared/apis/table/table";
import { encsDrawer } from "../../../shared/utils/drawer";
import {
  getApiEndpointNameFromRoutes,
  getTableTitleNameFromRoutes,
} from "../../../shared/utils/getApiEndpointFromRoutes";
import { useSelector } from "react-redux";
import { getSpacedDisplayName } from "../../../shared/utils/table";
import { MetadataLayout } from "../../../shared/layout";
const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [tableContents, setTableContents] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [report, showReport] = useState(false);
  const [activeEndPoint, setActiveEndPoint] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const [tableTitle, setTableTitle] = useState("");
  useEffect(() => {
    let endpointFromPath = getApiEndpointNameFromRoutes(
      encsDrawer,
      location,
      "environmentcatelogue/"
    );
    if (endpointFromPath) {
      getTable(endpointFromPath);
    } else {
      activeEndPoint.length > 0 && getTable(activeEndPoint);
    }
    setTableTitle(
      getTableTitleNameFromRoutes(encsDrawer, location, "environmentcatelogue/")
    );
  }, [refresh, location.pathname]);
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
  const onRowClick = (rowData) => {
    if (selectedRow.find((e) => e.id === rowData.id)) {
      const selectedItems = selectedRow.filter((e) => e.id !== rowData.id);
      setSelectedRow(selectedItems);
      console.log(rowData);
    } else {
      setSelectedRow([rowData, ...selectedRow]);
      console.log(rowData);
    }
  };
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
        />
      )}
    </MetadataLayout>
  );
};
export default Dashboard;