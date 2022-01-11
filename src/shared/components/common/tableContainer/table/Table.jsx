import "./table.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  tableData,
  setTableContents,
  onRowClick = () => {},
  report,
  selectedRow,
  status,
}) => {
  // destructuring header and rowData from DB(passed as props)
  const { header, data: rowData } = tableData;

  return (
    // start of the table
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
        status={status}
      />
      {/* added pagination */}
    </table>
    // end of the table
  );
};

export default Table;
