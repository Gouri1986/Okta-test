import {
  getSanitisedTableDatum,
  getSpacedDisplayName,
} from "../../../../utils/table";
import { PencilIcon, TrashIcon } from "./assets";
import { truncatedDesc } from "./utils";

// const RowAction=()=>{
//   return(
//     <div className='flex-r-ac pos-ab r-20 t-20'>
//     <div
//       onClick={() => {
//         deleteDataToTable(datum);
//       }}
//     >
//       <TrashIcon />
//     </div>
//     <div
//       onClick={() => {
//         setModalMode("UPDATE");
//         setModalOpen(true);
//         setModalForm(
//           Object.keys(datum).map((el) => {
//             return {
//               [el]: datum[el],
//               id: el,
//               pk: tableDetails.pk?.includes(el),
//               uk: tableDetails.uk?.includes(el),
//               dropdown: tableDetails.dropdown?.find((ele) => {
//                 return ele.name === el;
//               }),
//               checkbox: tableDetails.checkbox?.find((ele) => {
//                 return ele.name === el;
//               }),
//               json: tableDetails.json?.find((ele) => {
//                 return ele.name === el;
//               }),
//               title: getSpacedDisplayName(el),
//             };
//           })
//         );
//       }}
//       className='ml-15'
//     >
//       <PencilIcon />
//     </div>
//   </div>
//   )
// }

const RowCheckBox = () => {
  return (
    <div class='pos-ab pl-25 mb-35 cp table-checkbox-input-container'>
      <input
        type='checkbox'
        // checked={selectedRow.find((e) => e.id === datum.id)}
      />
      <span class='h-20 w-20 no-bdr checkmark'></span>
    </div>
  );
};

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
  status,
  setModalMode,
  setModalOpen,
  setModalForm,
  tableDetails,
  deleteDataToTable,
}) => {
  return (
    <div className='flex-r-ac flex-jc-sp-evn'>
      {[{}, ...header]?.map((item) => (
        <tr
          className={`w-${
            rowData.find((e) => e[item.id]?.length > 30)
              ? 400
              : item.title?.length > 25
              ? 400
              : item.title?.length > 20
              ? 300
              : 200
          } pos-rel flex-c-ac titan-table-rows bdr-button-primary-1 p-15`}
        >
          {rowData?.map((datum) => {
            return (
              <td className={` bdr-primary table-cell p-15`}>
                <span className={"table-data-cell"}>{datum[item.id]}</span>
              </td>
            );
          })}
        </tr>
      ))}
    </div>
  );
};

export default TableBody;
