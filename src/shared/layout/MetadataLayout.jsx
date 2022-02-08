import React from 'react';
import './metadataLayout.scss';
import { Navbar, Header, TableSettings } from '../components/common';
import Breadcrumbs from '../components/common/breadcumbs/Breadcrumbs';
import ComplienceIntro from '../../pages/metadata/securityCompliance/ChartsContainer';
import Accordion from '../components/common/widget/Accordion';
import Map from '../components/common/widget/map/Map';
const Layout = (props) => {
  const {
    children,
    tableData,
    tableTitle,
    openCRUDModal,
    setOpenCRUDModal,
    pageTitle,
    setCRUDModalType,
  } = props;

  return (
    <div className='overflow-y-scroll wp-50 hvh-100 flex-1 flex-c'>
      <div className='mt-33 mr-30 ml-30 '>
        <Header tableTitle={tableTitle} />
      </div>
      <div className='ml-30 mb-10 '>
        <Breadcrumbs
          parentTitle='Dashboard'
          parentPath=''
          tableTitle1={pageTitle}
          tableTitle2={tableTitle}
        />
      </div>
      <div className='pt-15 mr-30 ml-30 flex-c'>
        {tableTitle && (
          <>
            <p className='f-40 fw-600 fc-primary lh-1-0'>{tableTitle}</p>
            <p className='f-14 fw-400 fc-primary ml-3'>
              Welcome To {tableTitle}
            </p>
          </>
        )}
      </div>
      {/* Map section */}
      {/* <div
        style={{ backgroundColor: '#ffffff' }}
        className='bdr-r-10 mt-50 mb-25 ml-40 mr-40'
      >
        <Map />
      </div> */}
      <div className='flex-c ml-30 mr-30 pt-20'>
        <div className='flex-c bdr-r-10 bg-white pl-15 pr-15'>
          <div>
            <TableSettings
              tableTitle={tableTitle}
              modalOnClick={() => {
                setOpenCRUDModal(!openCRUDModal);
                setCRUDModalType('add');
              }}
            />
          </div>
          <div className='overflow-x-scroll metadata-table-container h-500 mt-15'>
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
        <div className='mt-20 mb-30'>{children[1]}</div>
      </div>
    </div>
  );
};
export default Layout;
