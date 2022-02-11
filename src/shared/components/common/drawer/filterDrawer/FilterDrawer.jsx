import React, { useState } from "react";
import { CloseIcon } from "./assets";
import { FilterDrawerDropDown } from "./filterDrawerDropDown";
import "./filterDrawer.scss";
import FilterInput from "./filterInput/FilterInput";
import FilterButton from "./filterButton/FilterButton";

const FilterDrawer = (props) => {
  const { filterDrawer, showFilterDrawer } = props;

  return (
    <div className={"bg-white flex-c pos-rel w-375 v-visible pos-sk hvh-100"}>
      <div className='flex-c p-25'>
        <h2 className='fc-black flex-r-ac flex-jc-sp-btn'>
          Filter
          <div onClick={() => showFilterDrawer(false)} className='cp '>
            <CloseIcon />
          </div>
        </h2>
        <div className='flex-c mt-25 p-15'>
          <FilterDrawerDropDown title={"Select Categories"} />
          <FilterDrawerDropDown title={"Select Control ID"} />
          <FilterDrawerDropDown title={"Select Region"} />
        </div>

        <div
          style={{ backgroundColor: "rgba(185, 185, 185, 0.28)" }}
          className='pl-15 pt-15 pr-15 bdr-r-10 mb-25'
        >
          <FilterInput placeholder={"Column Name"} />
          <FilterInput placeholder={"Operator"} />
          <FilterInput placeholder={"Expression"} />
        </div>
        <div className='filter-button-holder flex-r-jc-ac flex-jc-sp-btn'>
          <FilterButton
            onClick={showFilterDrawer}
            title={"Apply Filter"}
            colored
          />
          <FilterButton onClick={showFilterDrawer} title={"Cancel"} />
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
