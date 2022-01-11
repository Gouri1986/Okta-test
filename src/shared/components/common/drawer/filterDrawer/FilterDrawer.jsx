import React, { useState } from "react";
import { CloseIcon } from "./assets";
import { FilterDrawerDropDown } from "./filterDrawerDropDown";
import "./filterDrawer.scss";
import { FilterRadioButton } from "./filterRadioButton";
import FilterInput from "./filterInput/FilterInput";
import FilterButton from "./filterButton/FilterButton";

const FilterDrawer = (props) => {
  const { filterDrawer, showFilterDrawer } = props;
  const [selectedRadio, setSelectedRadio] = useState("Column");

  return (
    <div
      className={
        filterDrawer
          ? "bg-DarkDesaturatedBlue flex-c height100vh pos-rel w-375 v-visible"
          : "filter-drawer-container-collapsed bg-DarkDesaturatedBlue flex-c height100vh pos-rel w-0"
      }
    >
      <div className='flex-c pt-80 pb-80 pr-40 pl-40'>
        <h2 className='fc-tertiary'>Filter</h2>
        <div className='flex-c mt-50'>
          <FilterDrawerDropDown title={"Select Categories"} />
          <FilterDrawerDropDown title={"Select Control ID"} />
          <FilterDrawerDropDown title={"Select Region"} />
        </div>
        <div className='divider-white mt-40 mb-20' />
        <FilterDrawerDropDown title={"Advanced Filter"} />
        <div className='flex-r-ac flex-jc-sp-evn'>
          <FilterRadioButton
            selectedRadio={selectedRadio}
            setSelectedRadio={setSelectedRadio}
            title={"Row"}
          />
          <FilterRadioButton
            selectedRadio={selectedRadio}
            setSelectedRadio={setSelectedRadio}
            title={"Column"}
          />
        </div>
        <div>
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
      <div
        onClick={() => showFilterDrawer(false)}
        className='cp pos-ab t-50 l--20'
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default FilterDrawer;
