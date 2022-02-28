import React, { useState } from "react";
import "./metadataLayout.scss";
import { Header, TableSettings } from "../components/common";
import Breadcrumbs from "../components/common/breadcumbs/Breadcrumbs";
import Map from "../components/common/map/Map";
import Widget from "../components/common/widget/Widget";
import { useSelector } from "react-redux";
import Tenant from "../components/common/tenant/Tenant";

const Layout = (props) => {
  const {
    children,
    tableData,
    tableTitle,
    openCRUDModal,
    setOpenCRUDModal,
    pageTitle,
    setCRUDModalType,
    hideAdd,
    showWidget,
    showMap,
    showTable,
    showViewByOptions,
    showDefaultSelectedFilter
  } = props;

  const { tabs } = useSelector((state) => state.tableReducer);
  const { complianceDrawerExpanded } = useSelector(
    (state) => state.commonReducer
  );
  const [scrollBar, showScrollBar] = useState(false);

  return (
    <div className='overflow-y-scroll wp-100 pos-rel'>
      <div className='z-100 wp-100 h-82 sticky-container-br-0 flex-r-ac flex-jc-sp-btn pos-sk t-0'>
        <div className='pl-30 pr-40 wp-100'>
          <Header tableTitle={tableTitle} />
        </div>
      </div>
      <div className='flex-1 flex-c pl-30 pr-30'>
        <div className='mb-10 mt-50'>
          <Breadcrumbs
            parentTitle='Dashboard'
            parentPath=''
            tableTitle1={pageTitle}
            tableTitle2={tableTitle}
          />
        </div>
        <div className='pt-15 flex-c'>
          {tableTitle && (
            <>
              <div className='flex-r flex-r-ac'>
                <div className='flex-c'>
                  <p className='f-40 fw-600 fc-primary lh-1-0'>{tableTitle}</p>
                  <p className='f-14 fw-400 fc-primary ml-3'>
                    Welcome To {tableTitle}
                  </p>
                </div>
                <div className='ml-10 white-container-br-5 p-5'>
                  <Tenant />
                </div>
              </div>
            </>
          )}
        </div>
        {showWidget && (
          <div
            className={`bdr-r-10 mt-30 mb-45 bg-white ${
              complianceDrawerExpanded ? `drawer-toggle` : ``
            }`}
          >
            <Widget showViewByOptions={showViewByOptions} />
          </div>
        )}
        {showMap && (
          <div className='bdr-r-10 mt-50 mb-25 bg-white h-600'>
            <Map />
          </div>
        )}
        {showTable && (
          <div
            className={`flex-c pt-20  ${
              complianceDrawerExpanded ? `drawer-toggle` : ``
            }`}
          >
            <div className={`flex-c bdr-r-10 bg-white`}>
              <div className='pl-15 pr-15'>
                <TableSettings
                  tabs={tabs}
                  showDefaultSelectedFilter = {showDefaultSelectedFilter}
                  tableTitle={tableTitle}
                  hideAdd={hideAdd}
                  modalOnClick={() => {
                    setOpenCRUDModal(!openCRUDModal);
                    setCRUDModalType("add");
                  }}
                />
              </div>
              <div
                onMouseEnter={() => showScrollBar(true)}
                onMouseLeave={() => showScrollBar(false)}
                className={`${"overflow-x-auto"} metadata-table-container h-500 mt-15`}
              >
                {tableData.data?.length > 0 ? (
                  // table render
                  <div>{children[0]}</div>
                ) : (
                  <div className='wp-100 hp-100 flex-r-jc-ac p-50'>
                    <span className='f-20 fw-500'>No data to display</span>
                  </div>
                )}
              </div>
            </div>
            {/* pagination render */}
            <div
              className={`mt-20 mb-30 ${
                complianceDrawerExpanded ? `drawer-toggle` : ``
              }`}
            >
              {children[1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Layout;
