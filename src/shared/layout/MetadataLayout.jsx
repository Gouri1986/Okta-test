import React from "react";
import Navbar from "../components/common/drawer/navDrawer/NavDrawer";
import Header from "../components/common/header/Header";
import TableSettings from "../components/common/tableContainer/table/TableSettings";
import "./metadataLayout.scss";

const Layout = (props) => {
  const {
    setActiveEndPoint,
    setRefresh,
    refresh,
    getTable,
    children,
    tableData,
    tableTitle,
  } = props;

  return (
    <div className='flex-r pos-rel'>
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className='wp-93 hvh-100 flex-1 flex-c'>
        <div className='mt-33 mr-30 ml-30'>
          <Header tableTitle={tableTitle} />
        </div>
        <div className="flex-c mt-50 ml-30 mr-30">
          <div className="flex-c bdr-r-10 bg-white">
            <div>
              <TableSettings />
            </div>
            <div className='overflow-x-scroll metadata-table-container'>
              {tableData.data?.length > 0 ? (
                <div>{children}</div>
              ) : (
                <div className='wp-100 hp-100 flex-r-jc-ac p-50'>
                  <span className='f-20 fw-500'>No data to display</span>
                </div>
              )}
            </div>
          </div>
          <div className='mt-20'>
            <p>pagination</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
