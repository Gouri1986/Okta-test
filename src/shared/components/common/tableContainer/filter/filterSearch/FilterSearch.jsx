import React, { useState } from "react";
import "./filterSearch.scss";
import {
  FilterIcon,
  FilterSearchIcon,
  FilterSettingIcon,
  FilterCloseIcon,
} from "../assets";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const FilterSearch = () => {
  const { tableContents } = useSelector((state) => state.tableReducer);
  const [filterInput, setFilterInput] = useState("");
  const [filterValueInput, setFilterValueInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState([]);

  const { header, data } = tableContents;

  useEffect(() => {
    if (filterInput.length > 0) {
      const filteredColumnNames = header?.filter((e) =>
        e.title.toLowerCase().includes(filterInput.toLowerCase())
      );
      setSuggestions(filteredColumnNames);
    } else if (filterValueInput.length > 0) {
      const id = header.find((e) => e.title.includes(filterInput))?.id;
      const filteredRows = data?.filter((e) =>
        e[id]?.toLowerCase().includes(filterValueInput.toLowerCase())
      );
      console.log(filteredRows);
      setSuggestions(filteredRows);
    } else {
      setSuggestions([]);
    }
  }, [filterInput, filterValueInput]);

  return (
    <div className='titan-filter wp-100'>
      <div className='flex-r flex-r-ac mr-30'>
        <p className='fc-tertiary font-14 fw-500 pr-10'>Filter</p>
        <FilterSettingIcon />
      </div>
      <div className='flex-c wp-100 pos-rel'>
        {/* <div className='f-13 fw-500 fc-quaternary'>Search</div> */}
        <div className='filter-search flex-r-ac  '>
          <div className='flex-r-ac filter-search-input-holder'>
            {selectedColumn.map((column) => (
              <div className='bdr-tertiary-1 bg-white bdr-r-20 flex-r-ac pr-7 pl-7 b-5 mr-5 mb-4'>
                <p className='mr-7 f-12 fw-400 fc-secondary'>
                  {column.title} :{column.value}
                  <input
                    value={filterValueInput}
                    onChange={(e) => setFilterValueInput(e.target.value)}
                    className='no-bdr no-outline'
                  />
                </p>
                <span onClick={() => setSelectedColumn([])}>
                  <FilterCloseIcon />
                </span>
              </div>
            ))}
            <input
              value={filterInput}
              placeholder={"Search"}
              onChange={(e) => setFilterInput(e.target.value)}
              className='filter-search-input pt-10 pb-5 pr-10'
            />
          </div>

          <span className='filter-search-icon'>
            <FilterSearchIcon />
          </span>
        </div>
        {suggestions.length > 0 && (
          <div className='bg-white wp-80 pos-ab b--120 z-1000 flex-c white-container-br-10'>
            <span className='f-16 lh-2.4 fw-500 p-10 bdr-buttom-primary-1 bdr-primary'>
              Properties
            </span>
            {suggestions.map((item) => (
              <span
                onClick={() => {
                  setFilterInput("");
                  setSelectedColumn([
                    ...selectedColumn,
                    {
                      title: item.title,
                      value:
                        item[
                          header.find((e) => e.title.includes(filterInput))?.id
                        ],
                    },
                  ]);
                  setSuggestions([]);
                }}
                className=' pl-10 pr- pt-5 pb-5 f-14 lh-2.1 grey-hover cp'
              >
                {item.title ||
                  item[header.find((e) => e.title.includes(filterInput))?.id]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;
