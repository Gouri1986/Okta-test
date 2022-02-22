import { useSelector } from "react-redux";
import "./table.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = (props) => {
  const { filteredTableContents } = useSelector((state) => state.tableReducer);
  const { tableData, showCheckBox, showAction, tableDetails } = props;
  const { header, data: rowData } =
    filteredTableContents.data?.length > 0 ? filteredTableContents : tableData;

  const checkBoxObj = {
    title: "",
    id: "cb",
  };

  const actionObj = {
    title: "Action",
    id: "action",
  };

  const finalHeader =
    header &&
    [showCheckBox && checkBoxObj, ...header, showAction && actionObj].filter(
      (e) => e && !tableDetails.tableWhitelists?.includes(e?.id)
    );

  console.log(finalHeader);
  const headerProps = {
    tableData,
    header: finalHeader,
  };

  const bodyProps = {
    rowData,
    header: finalHeader,
    ...props,
  };

  const tableClassName = `flex-c ${
    finalHeader?.length < 10 ? "titan-table-fill" : "titan-table"
  }`;

  return (
    <>
      {/* start of the table */}
      <table className={tableClassName}>
        <TableHeader {...headerProps} />
        {/* <TableBody {...bodyProps} /> */}
      </table>
      {/* end of the table */}
    </>
  );
};

export default Table;
