// Import fatcolumns array to use it
// to  check if the cloumn require bigger width
import { useState } from "react";
import { TableHeaderSortDownArrow } from "./assets";

const TableHeaderCell = ({
  index,
  tableData,
  sort,
  sortTable,
  item,
  thWidths,
}) => {
  return (
    <th
      className={` table-header-cell w-${
        tableData.data.find((e) => e[item.id]?.length > 30)
          ? 400
          : item.title.length > 25
          ? 400
          : item.title.length > 20
          ? 300
          : item.title.length === 0
          ? 50
          : 200
      } p-15`}
      onClick={() => sortTable(item.id)}
    >
      <span>{item.title}</span>{" "}
      <TableHeaderSortDownArrow
        up={sort.id === item.id && sort.dir === "asc"}
      />
    </th>
  );
};

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
    <tr
      className={
        "pl-25 pr-25 pb-25 pos-sk t-0 z-1 flex-r-ac titan-table-header bdr-buttom-primary-1"
      }
    >
      {[{ id: "cb", title: "" }, ...header]?.map((item, index) => (
        <TableHeaderCell
          header={header}
          sort={sort}
          index={index}
          item={item}
          sortTable={sortTable}
          tableData={tableData}
        />
      ))}
    </tr>
  );
};

export default TableHeader;
