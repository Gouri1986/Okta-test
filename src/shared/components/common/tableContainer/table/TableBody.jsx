import { PencilIcon, TrashIcon } from "./assets";
import { truncatedDesc } from "./utils";

const TableBody = ({
  rowData,
  header,
  onRowClick,
  selectedRow,
  showFilterDrawer,
  status,
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
            showFilterDrawer(false);
          }}
          className='pos-rel flex-r-ac pt-20 pb-20 pr-25 pl-25 mt-2 mb-2 cp titan-table-rows'
        >
          <div class='pos-ab pl-25 mb-35 cp table-checkbox-input-container'>
            <input
              type='checkbox'
              checked={selectedRow.find((e) => e.id === datum.id)}
            />
            <span class='h-20 w-20 no-bdr checkmark'></span>
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
            <div>
              <TrashIcon />
            </div>
            <div className='ml-15'>
              <PencilIcon />
            </div>
          </div>
        </tr>
      ))}
    </div>
  );
};

export default TableBody;
