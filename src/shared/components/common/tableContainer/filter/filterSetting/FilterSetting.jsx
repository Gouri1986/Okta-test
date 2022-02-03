import React from "react";
import "./filterSetting.scss";
import { FilterIcon } from "../assets";
import { tableData as tbData } from "../../../db";

const FilterSetting = ({
  tableData,
  showReport,
  setTableContents,
  filterDrawer,
  showFilterDrawer,
}) => {
  const { header } = tbData;

  return (
    <div className='titan-filter'>
      <div className='filter-search'>
        <span className='filter-search-icon'>
          <FilterIcon />
        </span>
        <input className='filter-search-input' />
      </div>
    </div>
  );
};

export default FilterSetting;