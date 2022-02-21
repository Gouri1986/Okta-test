import { useState } from "react"
import { useDispatch } from "react-redux"
import { setTableContents } from "../../../../../redux/table/tabelActions"
import { TableHeaderSortDownArrow } from "./assets"

const TableHeaderCell = ({ tableData, headerStaticVisbility, sort, sortTable, item = {} }) => {
  
  const getWidthOfCell = () => {
    return headerStaticVisbility
      ? item?.width
      : tableData.data.find(e => e[item.id]?.length > 30)
      ? 400
      : item.title?.length > 25
      ? 400
      : item.title?.length > 20
      ? 300
      : item.title?.length === 0
      ? 50
      : 200
  }

  const actionColumnClassName = `${
    (item.id === "action" || item.id === "resources" || item.id === "regulationControls") && `bg-white`
  }`

  const thClassName = `pl-0 pr-0 pt-15 pb-15 w-${getWidthOfCell()} flex-r table-header-cell ${actionColumnClassName} ${ item?.mr ? `mr-${item.mr}` : '0'}`

  return (
    <th className={thClassName} onClick={() => sortTable(item.id)}>
      <span>{item.title}</span>
      {item.id !== "cb" && item.id !== "action" && (
        <TableHeaderSortDownArrow up={sort.id === item.id && sort.dir === "asc"} />
      )}
    </th>
  )
}

const TableHeader = ({ header, tableData, headerStaticVisbility }) => {
  const [sort, setSort] = useState({ id: "", dir: "" })
  const dispatch = useDispatch()

  const sortTable = id => {
    if (sort.dir === "asc") {
      const sortedData = tableData.data.sort((a, b) => a[id].localeCompare(b[id]))

      dispatch(setTableContents({ ...tableData, data: sortedData }))
      setTableContents({ ...tableData, data: sortedData })
      setSort({ id, dir: "desc" })
    } else {
      const sortedData = tableData.data.sort((a, b) => b[id].localeCompare(a[id]))
      dispatch(setTableContents({ ...tableData, data: sortedData }))
      setSort({ id, dir: "asc" })
    }
  }

  return (
    <tr
      className={
        "pb-0 pos-sk t-0 z-1 flex-r-ac titan-table-header bdr-buttom-primary-1 flex-jc-sp-evn bg-white"
      }
    >
      {header?.map(item => (
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
  )
}

export default TableHeader
