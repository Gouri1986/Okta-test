import React from "react";
import Navbar from "../components/common/drawer/navDrawer/NavDrawer";
import Header from "../components/common/header/Header";
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
      <div className='wp-93 hvh-100 flex-1 flex-c '>
        <div className=' mt-50 mr-50 ml-50'>
          <Header tableTitle={tableTitle} />
        </div>
        <div className='bg-white bdr-r-10 overflow-x-scroll m-50 metadata-table-container'>
          {tableData.data?.length > 0 ? (
            children
          ) : (
            <div className='wp-100 hp-100 flex-r-jc-ac p-50'>
              <span className='f-20 fw-500'>No data to display</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
