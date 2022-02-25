import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTableContents } from "../../../../../redux/table/tabelActions";
import { TableHeaderSortDownArrow } from "./assets";

const TableHeaderCell = ({
  tableData,
  headerStaticVisbility,
  sort,
  sortTable,
  item = {},
}) => {
  const getWidthOfCell = () => {
    return headerStaticVisbility
      ? item?.width
      : tableData.data.find((e) => e[item.id]?.length > 30)
      ? 400
      : item.title?.length > 25
      ? 400
      : item.title?.length > 20
      ? 300
      : item.title?.length === 0
      ? 50
      : 200;
  };

  const actionColumnClassName = `${
    item.id === "action" ||
    item.id === "resources" ||
    item.id === "regulationControls"
  }`;

  const thClassName = `ml-5 mr-5 pl-0 pr-0 pt-5 pb-5 w-${getWidthOfCell()} flex-c-jc table-header-cell ${actionColumnClassName} ${
    item?.mr ? `mr-${item.mr}` : "0"
  }`;

  return (
    <th
      style={{
        backgroundColor: item.id === "Severity" ? "#efefef" : "",
      }}
      className={thClassName}
      onClick={() => sortTable(item.id)}
    >
      <div className='wp-100'>
        <div className='flex-r-jc-ac'>
          {item.id !== "cb" &&
            item.id !== "action" &&
            item.id !== "Severity" && (
              <TableHeaderSortDownArrow
                up={sort.id === item.id && sort.dir === "asc"}
              />
            )}
          <span className='ml-5'>{item.title}</span>
        </div>

        {item.id === "Severity" && (
          <div className='flex-r-jc-ac severity-sb-header'>
            <div>
              <TableHeaderSortDownArrow
                up={sort.id === item.id && sort.dir === "asc"}
              />
              <span className='ml-5 mr-10'>C</span>
            </div>
            <div>
              <TableHeaderSortDownArrow
                up={sort.id === item.id && sort.dir === "asc"}
              />
              <span className='ml-5 mr-10'>I</span>
            </div>
            <div>
              <TableHeaderSortDownArrow
                up={sort.id === item.id && sort.dir === "asc"}
              />
              <span className='ml-5 mr-5'>A</span>
            </div>
          </div>
        )}
      </div>
    </th>
  );
};

const TableHeader = ({ header, tableData, headerStaticVisbility }) => {
  const [sort, setSort] = useState({ id: "", dir: "" });
  const dispatch = useDispatch();

  const sortTable = (id) => {
    if (sort.dir === "asc") {
      const sortedData = tableData.data.sort((a, b) =>
        a[id].localeCompare(b[id])
      );

      dispatch(setTableContents({ ...tableData, data: sortedData }));
      setTableContents({ ...tableData, data: sortedData });
      setSort({ id, dir: "desc" });
    } else {
      const sortedData = tableData.data.sort((a, b) =>
        b[id].localeCompare(a[id])
      );
      dispatch(setTableContents({ ...tableData, data: sortedData }));
      setSort({ id, dir: "asc" });
    }
  };

  return (
    <tr
      className={
        "pb-0 pos-sk t-0 z-1 flex-r-ac titan-table-header  flex-jc-sp-evn "
      }
    >
      {header?.map((item) => (
        <TableHeaderCell
          header={header}
          sort={sort}
          item={item}
          sortTable={sortTable}
          tableData={tableData}
          headerStaticVisbility={headerStaticVisbility}
        />
      ))}
    </tr>
  );
};

export default TableHeader;
