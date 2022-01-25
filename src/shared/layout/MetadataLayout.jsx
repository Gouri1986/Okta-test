import React, { useState } from "react"
import "./metadataLayout.scss"
// Common components imports
import { Navbar, Header, TableSettings, BreadCumbs, Modal, ModalForm } from "../components/common"

const Layout = props => {
  const { setActiveEndPoint, setRefresh, refresh, getTable, children, tableData, tableTitle, serviceTitle } =
    props

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
          <BreadCumbs
            parentTitle="Dashboard"
            parentPath=""
            tableTitle1={serviceTitle}
            tableTitle2={tableTitle}
          />
        </div>
        <div className="flex-c ml-30 mr-30 hvh-82">
          <div className="flex-c bdr-r-10 bg-white">
            <div>
              <TableSettings modalOnClick={() => setOpen(!open)} />
            </div>
            <div className="overflow-x-scroll metadata-table-container">
              {tableData.data?.length > 0 ? (
                <div>{children[0]}</div>
              ) : (
                <div className="wp-100 hp-100 flex-r-jc-ac p-50">
                  <span className="f-20 fw-500">No data to display</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-20">{children[1]}</div>
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
            : tableData?.header?.length > 30
            ? `xl`
            : ""
        }`} // sm, md, lg, xl
        columnCount={tableData?.header?.length}
        modalTitle={tableTitle}
      >
        <ModalForm tableData={tableData} onCancel={() => setOpen(false)} />
      </Modal>
    </div>
  )
}
export default Layout
