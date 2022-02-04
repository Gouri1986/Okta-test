import React from "react"
import "./metadataLayout.scss"
import { Navbar, Header, TableSettings } from "../components/common"
import Breadcrumbs from "../components/common/breadcumbs/Breadcrumbs"
const Layout = props => {
  const {
    setActiveEndPoint,
    setRefresh,
    refresh,
    getTable,
    children,
    tableData,
    tableTitle,
    drawer,
    openCRUDModal,
    setOpenCRUDModal,
    pageTitle,
    setCRUDModalType
  } = props

  return (
    <div className="flex-r pos-rel">
      <div>
        <Navbar
          drawer={drawer}
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className='wp-50 hvh-100 flex-1 flex-c'>
        <div className='mt-33 mr-30 ml-30 hvh-13'>
          <Header tableTitle={tableTitle} />
        </div>
        <div className="ml-30 mb-10 hvh-3">
          <Breadcrumbs
            parentTitle="Dashboard"
            parentPath=""
            tableTitle1={pageTitle}
            tableTitle2={tableTitle}
          />
        </div>
        <div className="pt-15 mr-30 ml-30 hvh-7 flex-c">
          {tableTitle && (
            <>
              <p className="f-40 fw-600 fc-primary lh-1-0">{tableTitle}</p>
              <p className="f-14 fw-400 fc-primary ml-3">Welcome To {tableTitle}</p>
            </>
          )}
        </div>
        <div className="flex-c ml-30 mr-30 hvh-78 pt-20">
          <div className="flex-c bdr-r-10 bg-white pl-15 pr-15">
            <div>
              <TableSettings
                modalOnClick={() => {
                  setOpenCRUDModal(!openCRUDModal)
                  setCRUDModalType("add")
                }}
              />
            </div>
            <div className="overflow-x-scroll metadata-table-container">
              {tableData.data?.length > 0 ? (
                // table render
                <div>{children[0]}</div>
              ) : (
                <div className="wp-100 hp-100 flex-r-jc-ac p-50">
                  <span className="f-20 fw-500">No data to display</span>
                </div>
              )}
            </div>
          </div>
         {/* pagination render */}
          <div className="mt-20">{children[1]}</div>
        </div>
      </div>
    </div>
  )
}
export default Layout
