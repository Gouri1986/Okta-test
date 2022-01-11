import {
  getSanitisedTableDatum,
  getSpacedDisplayName,
} from "../../../../utils/table";
import { PencilIcon, TrashIcon } from "./assets";
import { truncatedDesc } from "./utils";

const TableBody = ({
  rowData,
  header,
  onRowClick,
  selectedRow,
  status,
  setModalMode,
  setModalOpen,
  setModalForm,
  modalForm,
  tableDetails,
  deleteDataToTable,
}) => {
  const StatusColumn = ({ datum, item }) => {
    return (
      <td className={"table-cell"} title={datum[item.id]}>
        <span
          className={
            datum[item.id] === "compliant"
              ? "table-data-cell-status"
              : "table-data-cell-status-neg"
          }
        >
          {datum[item.id]?.length > 15
            ? truncatedDesc(datum[item.id])
            : datum[item.id]}
        </span>
      </td>
    );
  };

  return (
    <div className='table-row-container'>
      {rowData?.map((datum) => (
        <tr
          onClick={() => {
            onRowClick(datum);
          }}
          className='pos-rel flex-r-ac pt-20 pb-20 pr-25 pl-25 mt-2 mb-2 cp titan-table-rows bg-w'
        >
          <div class='pos-ab pl-25 mb-35 cp table-checkbox-input-container'>
            <input
              type='checkbox'
              checked={selectedRow.find((e) => e.id === datum.id)}
            />
            <span class='h-20 w-20 no-border checkmark'></span>
          </div>
          {header?.map((item) =>
            status && item.id === "compliance" ? (
              <StatusColumn datum={datum} item={item} />
            ) : (
              <td className={"table-cell"} title={datum[item.id]}>
                <span className={"table-data-cell"}>
                  {datum[item.id]?.length > 15
                    ? truncatedDesc(datum[item.id])
                    : datum[item.id]}
                </span>
              </td>
            )
          )}
          <div className='flex-r-ac pos-ab r-20 t-20'>
            <div
              onClick={() => {
                setModalForm(
                  modalForm?.map((e) => {
                    return Object.keys(datum).map((el) => {
                      return {
                        [el]: datum[el],
                        id: el,
                        pk: tableDetails.pk?.includes(el),
                        uk: tableDetails.uk?.includes(e.id),
                        dropdown: tableDetails.dropdown?.find(
                          (el) => el.name === e.id.trim()
                        ),
                        checkbox: tableDetails.checkbox?.find(
                          (el) => el.name === e.id.trim()
                        ),
                        json: tableDetails.json?.find(
                          (el) => el.name === e.id.trim()
                        ),
                        title: getSpacedDisplayName(el),
                      };
                    });
                  })?.[0]
                );
                deleteDataToTable();
              }}
            >
              <TrashIcon />
            </div>
            <div
              onClick={() => {
                console.log(
                  Object.keys(datum).map((el) => {
                    return {
                      [el]: datum[el],
                      id: el,
                      pk: tableDetails.pk?.includes(el),
                      uk: tableDetails.uk?.includes(el),
                      title: getSpacedDisplayName(el),
                    };
                  })
                );
                setModalMode("UPDATE");
                setModalOpen(true);
                setModalForm(
                  Object.keys(datum).map((el) => {
                    return {
                      [el]: datum[el],
                      id: el,
                      pk: tableDetails.pk?.includes(el),
                      uk: tableDetails.uk?.includes(el),
                      dropdown: tableDetails.dropdown?.find((ele) => {
                        return ele.name === el;
                      }),
                      checkbox: tableDetails.checkbox?.find((ele) => {
                        return ele.name === el;
                      }),
                      json: tableDetails.json?.find((ele) => {
                        return ele.name === el;
                      }),
                      title: getSpacedDisplayName(el),
                    };
                  })
                );
              }}
              className='ml-15'
            >
              <PencilIcon />
            </div>
          </div>
        </tr>
      ))}
    </div>
  );
};

export default TableBody;
