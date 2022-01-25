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
    setModalMode,
    setModalOpen,
    setModalForm,
    modalForm,
    tableDetails,
    deleteDataToTable,
    tableRowkey,
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
    setTableContents: setTableContents,
    tableData: tableData,
    header: finalHeader,
  };

  const bodyProps = {
    onRowClick: onRowClick,
    rowData: rowData,
    selectedRow: selectedRow,
    header: finalHeader,
    setModalMode: setModalMode,
    setModalOpen: setModalOpen,
    setModalForm: setModalForm,
    modalForm: modalForm,
    tableDetails: tableDetails,
    deleteDataToTable: deleteDataToTable,
    tableRowkey,
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
