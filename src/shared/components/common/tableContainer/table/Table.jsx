import "./table.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const {
    tableData,
    setTableContents,
    onRowClick = () => {},
    selectedRow,
    showCheckBox,
    showAction,
    tableDetails,
    page,
    rowsPerPage,
    tableTitle,
    tableRowkey,
    openCRUDModal,
    setOpenCRUDModal,
    activeEndPoint,
    getTable,
  } = props;
  const { header, data: rowData } = tableData;

  const checkBoxObj = {
    title: "",
    id: "cb",
  };

  const actionObj = {
    title: "Action",
    id: "action",
  };

  const finalHeader = [
    showCheckBox && checkBoxObj,
    ...header,
    showAction && actionObj,
  ];

  const headerProps = {
    setTableContents,
    tableData,
    header: finalHeader,
  };

  const bodyProps = {
    tableData,
    onRowClick,
    rowData,
    selectedRow,
    header: finalHeader,
    tableDetails,
    page,
    rowsPerPage,
    tableTitle,
    tableRowkey,
    openCRUDModal,
    setOpenCRUDModal,
    activeEndPoint,
    getTable,
  };

  const tableClassName = `flex-c ${
    finalHeader?.length < 10 ? "titan-table-fill" : "titan-table"
  }`;

  return (
    <>
      {/* start of the table */}
      <table className={tableClassName}>
        <TableHeader {...headerProps} />
        <TableBody {...bodyProps} />
      </table>
      {/* end of the table */}
    </>
  );
};

export default Table;
