import React from "react";
import { FilterDrawerDropDownArrow } from "../assets";

const FilterDrawerDropDown = ({ title }) => {
  return (
    <div className='mb-20 pt-13 pr-11 pb-14 pl-20 flex-r-ac flex-jc-sp-btn bdr-black-2 bdr-r-6'>
      <span className='f-18 fw-500 fc-black'>{title}</span>
      <div>
        <FilterDrawerDropDownArrow />
      </div>
    </div>
  );
};

export default FilterDrawerDropDown;
