// Import fatcolumns array to use it
// to  check if the cloumn require bigger width
import { useState } from "react";
import { TableHeaderSortDownArrow } from "./assets";

const TableHeader = ({ header, tableData, setTableContents }) => {
  const [sort, setSort] = useState({ id: "", dir: "" });

  const sortTable = (id) => {
    if (sort.dir === "asc") {
      const sortedData = tableData.data.sort((a, b) =>
        a[id].localeCompare(b[id])
      );
      setTableContents({ ...tableData, data: sortedData });
      setSort({ id, dir: "desc" });
    } else {
      const sortedData = tableData.data.sort((a, b) =>
        b[id].localeCompare(a[id])
      );
      setTableContents({ ...tableData, data: sortedData });
      setSort({ id, dir: "asc" });
    }
  };

  return (
    <tr className={"flex-r-ac pt-7 pr-30 pb-7 pl-30 titan-table-header bdr-buttom-primary-1"}>
      {header?.map((item) => (
        <th onClick={() => sortTable(item.id)}>
          <span>{item.title}</span>{" "}
          <TableHeaderSortDownArrow
            up={sort.id === item.id && sort.dir === "asc"}
          />
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
