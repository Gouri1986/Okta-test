import React from "react";
import Navbar from "../components/common/drawer/navDrawer/NavDrawer";
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
    <div className='flex-r width100'>
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className='main-ly wp-100 height100vh pl-20 pr-20 flex-c overflow-x-scroll overflow-y-scroll'>
        <div className='table-parent overflow-x-auto overflow-y-scroll width100'>
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
