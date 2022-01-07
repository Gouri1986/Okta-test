import React from "react";
import "./filter.css";
import { FilterIcon } from "./assets";
import { FilterDropDown } from "./filterDropDown";
import { tableData as tbData } from "../../../db";

const Filter = ({
  tableData,
  showReport,
  setTableContents,
  filterDrawer,
  showFilterDrawer,
}) => {
  const { header } = tbData;
  const quickFilterContents = header?.filter(
    (e) =>
      e.id === "service-type" ||
      e.id === "resource-type" ||
      e.id === "regular-control"
  );

  return (
    <div className='titan-filter'>
      <div
        onClick={() => {
          showFilterDrawer(!filterDrawer);
          showReport(false);
        }}
        className='titan-filter-icon'
      >
        <FilterIcon />
      </div>
      <div className='dropdown-container'>
        {quickFilterContents?.map((content) => (
          <div className='titan-filter-dropdown'>
            <FilterDropDown
              setTableContents={setTableContents}
              {...content}
              tableData={tbData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
