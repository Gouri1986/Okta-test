import React, { useState } from "react"

import { getSanitisedTableDatum, getSpacedDisplayName } from "../../../../utils/table"
import { PencilIcon, TrashIcon } from "./assets"
import { truncatedDesc } from "./utils"

import ModalRight from "../../modal/right/ModalRight"


const RowAction = () => {
  return (
    <div className="flex-r-jc-ac t-20">
      <div
        onClick={() => {
          // deleteDataToTable(datum);
        }}
      >
        <TrashIcon />
      </div>
      <div
        onClick={() => {
          // setModalMode("UPDATE");
          // setModalOpen(true);
          // setModalForm(
          //   Object.keys(datum).map((el) => {
          //     return {
          //       [el]: datum[el],
          //       id: el,
          //       pk: tableDetails.pk?.includes(el),
          //       uk: tableDetails.uk?.includes(el),
          //       dropdown: tableDetails.dropdown?.find((ele) => {
          //         return ele.name === el;
          //       }),
          //       checkbox: tableDetails.checkbox?.find((ele) => {
          //         return ele.name === el;
          //       }),
          //       json: tableDetails.json?.find((ele) => {
          //         return ele.name === el;
          //       }),
          //       title: getSpacedDisplayName(el),
          //     };
          //   })
          // );
        }}
        className="ml-15"
      >
        <PencilIcon />
      </div>
    </div>
  )
}

const RowCheckBox = ({ onRowClick, selectedRow, datum }) => {
  return (
    <div class=" cp table-checkbox-input-container">
      <input type="checkbox" checked={selectedRow.find(e => e.id === datum.id)} />
      <span onClick={() => onRowClick(datum)} class="h-15 w-15  checkmark"></span>
    </div>
  )
}

// const StatusColumn = ({ datum, item }) => {
//   return (
//     <td className={"table-cell"} title={datum[item.id]}>
//       <span
//         className={
//           datum[item.id] === "compliant"
//             ? "table-data-cell-status"
//             : "table-data-cell-status-neg"
//         }
//       >
//         {datum[item.id]?.length > 15
//           ? truncatedDesc(datum[item.id])
//           : datum[item.id]}
//       </span>
//     </td>
//   );
// };

const TableBody = ({
  rowData,
  header,
  onRowClick,
  selectedRow,
  setModalMode,
  setModalOpen,
  setModalForm,
  tableDetails,
  deleteDataToTable
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex-c ">
      {rowData?.map(datum => (
        console.log(datum),
        <tr
          onClick={() => setOpen(!open)}
          className={`pos-rel flex-jc-sp-evn titan-table-rows bdr-buttom-primary-1 pt-10 pb-10`}
        >
           <ModalRight
        open={open}
        close={() => setOpen(false)}
        size="sm" // sm, md, lg, xl
        body={<p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>}
      />
          {header?.map(item => {
            return (
              <td
                className={`${item.id === "action" && "pos-sk r-0 bg-white"}
                  w-${
                    rowData.find(e => e[item.id]?.length > 30)
                      ? 400
                      : item.title?.length > 25
                      ? 400
                      : item.title?.length > 20
                      ? 300
                      : item.title?.length === 0
                      ? 50
                      : 200
                  }     bdr-primary table-cell p-15`}
              >
                {item.id === "action" ? (
                  <RowAction />
                ) : item.id === "cb" ? (
                  <RowCheckBox onRowClick={() => onRowClick(datum)} selectedRow={selectedRow} datum={datum} />
                ) : (
                  <span className={"table-data-cell"}>{datum[item.id]}</span>
                )}
              </td>
            )
          })}
        </tr>
      ))}
     
    </div>
  )
}

export default TableBody
