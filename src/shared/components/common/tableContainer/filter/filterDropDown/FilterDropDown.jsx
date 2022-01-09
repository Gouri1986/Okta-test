import React, { useEffect, useState } from "react";
import { FilterDownArrow, FilterUpArrow } from "../assets";

const FilterDropDown = ({ id, title, tableData, setTableContents }) => {
  const [dropDown, showDropDown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const noDuplicateData = [
    ...new Set(tableData.data?.map((datum) => datum[id])),
  ];

  const setDropDownVisibility = (e) => {
    showDropDown(!dropDown);
  };

  const addFilters = (event) => {
    const { target } = event;
    const { checked } = target;
    const { [selectedFilters?.indexOf(target.name)]: name, ...rest } =
      selectedFilters;
    checked
      ? setSelectedFilters([...selectedFilters, target.name])
      : setSelectedFilters(Object.values(rest));
  };

  useEffect(() => {
    selectedFilters.length > 0
      ? setTableContents({
          ...tableData,
          data: tableData.data.filter((e) => selectedFilters.includes(e[id])),
        })
      : setTableContents(tableData);
  }, [selectedFilters]);

  return (
    <div className="titan-filter-dropdown-menu">
      <div
        onClick={(e) => {
          setDropDownVisibility(e);
        }}
        className="flex-r-ac flex-r-jc-sp"
      >
        <span>Select {title}</span>
        {!dropDown ? <FilterUpArrow /> : <FilterDownArrow />}
      </div>

      {dropDown && (
        <div className="filter-dropdown-options">
          {noDuplicateData.map((datum) => (
            <div>
              <label class="checkbox-input-container">
                <span>{datum}</span>
                <input
                  name={datum}
                  onChange={(e) => {
                    // setTableContents({
                    //   ...tableData,
                    //   data: tableData.data.filter(
                    //     (e) => e["service-type"] == datum
                    //   ),
                    // })
                    addFilters(e);
                  }}
                  type="checkbox"
                />
                <span class="checkmark"></span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
