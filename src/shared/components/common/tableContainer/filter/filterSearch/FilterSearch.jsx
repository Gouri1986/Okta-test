import React, { useState } from "react";
import "./filterSearch.scss";
import { FilterIcon, FilterSearchIcon, FilterSettingIcon } from "../assets";

const FilterSearch = () => {
  const [filterInput, setFilterInput] = useState("");

  return (
    <div className='titan-filter wp-100'>
      <div className='flex-r flex-r-ac mr-40'>
        <p className='fc-tertiary font-14 fw-500 pr-10'>Filter</p>
        <FilterSettingIcon />
      </div>
      <div className='flex-c wp-100'>
        <div className='f-13 fw-500 fc-quaternary'>Search</div>
        <div className='filter-search flex-r-ac'>
          <input
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            className='filter-search-input pt-5 pb-5 pr-10'
          />
          <span className='filter-search-icon'>
            <FilterSearchIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
