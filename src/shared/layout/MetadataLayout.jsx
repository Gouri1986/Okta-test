import React from "react";
import Navbar from "../components/common/drawer/navDrawer/NavDrawer";
import Header from "../components/common/header/Header";
import ReportDrawer from "../components/common/drawer/reportDrawer/ReportDrawer";

const Layout = (props) => {
  const {
    setActiveEndPoint,
    setRefresh,
    refresh,
    getTable,
    children,
    report,
    showReport,
  } = props;

  return (
    <div className='flex-r wp-100'>
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className='main-ly wp-100 hvh-100 ml-38 mr-30 mt-31 flex-c overflow-x-scroll overflow-y-scroll'>
        <div>
          <Header />
        </div>
        <div className='table-parent overflow-x-auto overflow-y-scroll wp-100'>
          {children}
        </div>
        <div>
          <ReportDrawer report={report} showReport={showReport} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
