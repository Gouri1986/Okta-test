import React, { useState } from "react"
import Navbar from "../components/common/drawer/navDrawer/NavDrawer"
import Header from "../components/common/header/Header"
import TableSettings from "../components/common/tableContainer/table/TableSettings"
import "./metadataLayout.scss"
import BreadCumbs from "../components/common/breadcumbs/BreadCumbs"
import Modal from "../components/common/modal/center/Modal"

const Layout = props => {
  const { setActiveEndPoint, setRefresh, refresh, getTable, children, tableData, tableTitle } = props

  const [open, setOpen] = useState(false)
  return (
    <div className="flex-r pos-rel">
      <div>
        <Navbar
          setActiveEndPoint={setActiveEndPoint}
          setRefresh={setRefresh}
          refresh={refresh}
          onClick={getTable}
        />
      </div>
      <div className="wp-93 hvh-100 flex-1 flex-c">
        <div className="mt-33 mr-30 ml-30 hvh-13">
          <Header tableTitle={tableTitle} />
        </div>
        <div className="ml-30 mb-10 hvh-3">
          <BreadCumbs parentTitle="Dashboard" parentPath="" tableTitle={tableTitle} />
        </div>
        <div className="flex-c ml-30 mr-30 hvh-82">
          <div className="flex-c bdr-r-10 bg-white">
            <div>
              <TableSettings modalOnClick={() => setOpen(!open)} />
            </div>
            <div className="overflow-x-scroll metadata-table-container">
              {tableData.data?.length > 0 ? (
                <div>{children}</div>
              ) : (
                <div className="wp-100 hp-100 flex-r-jc-ac p-50">
                  <span className="f-20 fw-500">No data to display</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-20">
            <p>pagination</p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        close={() => setOpen(false)}
        size={`${
          tableData?.header?.length < 10
            ? `sm`
            : tableData?.header?.length < 15
            ? `md`
            : tableData?.header?.length < 30
            ? `lg`
            : tableData?.header?.length > 30 ? `xl` : ""
        }`} // sm, md, lg, xl
        modalTitle={tableTitle}
      >
        {tableData?.header?.map((obj, i) => (
          <div key={i}>
            <span>{obj.title}</span> <br />
            <span>{obj.title}</span>
          </div>
        ))}
      </Modal>
    </div>
  )
}
export default Layout
