import "./table.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const {
    tableData,
    setTableContents,
    onRowClick = () => {},
    report,
    selectedRow,
    showCheckBox,
    showAction,
    setModalMode,
    setModalOpen,
    setModalForm,
    modalForm,
    tableDetails,
    deleteDataToTable,
  } = props;
  const { header, data: rowData } = tableData;

  const headerProps = {
    setTableContents: setTableContents,
    tableData: tableData,
    header: header,
  };

  const bodyProps = {
    report: report,
    onRowClick: onRowClick,
    rowData: rowData,
    selectedRow: selectedRow,
    header: header,
    setModalMode: setModalMode,
    setModalOpen: setModalOpen,
    setModalForm: setModalForm,
    modalForm: modalForm,
    tableDetails: tableDetails,
    deleteDataToTable: deleteDataToTable,
  };

  return (
    <>
      {/* start of the table */}
      <table
        className={`flex-c ${
          header?.length < 10 ? "titan-table-fill" : "titan-table"
        }`}
      >
        <TableHeader {...headerProps} />
        <TableBody {...bodyProps} />
      </table>
      {/* end of the table */}
    </>
  );
};

export default Table;
