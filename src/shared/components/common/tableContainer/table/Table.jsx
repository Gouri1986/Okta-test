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
    status,
    setModalMode,
    setModalOpen,
    setModalForm,
    modalForm,
    tableDetails,
    deleteDataToTable,
  } = props;
  const { header, data: rowData } = tableData;

  return (
    <>
      {/* start of the table */}
      <table
        className={`flex-c ${
          header?.length < 10 ? "titan-table-fill" : "titan-table"
        }`}
      >
        {/* condition rendering of header */}
        <TableHeader
          setTableContents={setTableContents}
          tableData={tableData}
          header={header}
        />

        {/* conditional rendering of rows with respect to id of header */}
        <TableBody
          report={report}
          onRowClick={onRowClick}
          rowData={rowData}
          selectedRow={selectedRow}
          header={header}
          setModalMode={setModalMode}
          setModalOpen={setModalOpen}
          setModalForm={setModalForm}
          modalForm={modalForm}
          tableDetails={tableDetails}
          deleteDataToTable={deleteDataToTable}
        />
        {/* added pagination */}
      </table>
      {/* end of the table */}
    </>
  );
};

export default Table;
