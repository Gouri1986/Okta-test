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
  const [suggestions, setSuggestions] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState([]);

  const { header, data } = tableContents;

  useEffect(() => {
    if (filterInput.length > 0) {
      const filteredColumnNames = header?.filter((e) =>
        e.title.toLowerCase().includes(filterInput.toLowerCase())
      );
      setSuggestions(filteredColumnNames);
    } else {
      setSuggestions([]);
    }
  }, [filterInput]);

  return (
    <div className='titan-filter wp-100'>
      <div className='flex-r flex-r-ac mr-40'>
        <p className='fc-tertiary font-14 fw-500 pr-10'>Filter</p>
        <FilterSettingIcon />
      </div>
      <div className='flex-c wp-100 '>
        <div className='f-13 fw-500 fc-quaternary'>Search</div>
        <div className='filter-search flex-r-ac pos-rel '>
          <div className='flex-r-ac filter-search-input-holder'>
            {selectedColumn.map((column) => (
              <div className='bdr-tertiary-1 bg-white bdr-r-20 flex-r-ac pb-1 pt-1 pr-7 pl-7 b-5 mr-5 mb-8'>
                <p className='pr-7 f-12 fw-400 fc-secondary'>{column}</p>
                <span onClick={() => setSelectedColumn([])}>
                  <FilterCloseIcon />
                </span>
              </div>
            ))}
            <input
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className='filter-search-input pt-10 pb-5 pr-10'
            />
          </div>

          <span className='filter-search-icon'>
            <FilterSearchIcon />
          </span>
        </div>
        {suggestions.length > 0 && (
          <div className='bg-white wp-80 pos-ab t-50 z-1000 flex-c white-container'>
            <span className='f-16 lh-2.4 fw-500 p-10 bdr-buttom-primary-1 bdr-primary'>
              Properties
            </span>
            {suggestions.map((item) => (
              <span
                onClick={() => {
                  setFilterInput("");
                  setSelectedColumn([...selectedColumn, item.title]);
                  setSuggestions([]);
                }}
                className=' pl-10 pr-10 pt-5 pb-5 f-14 lh-2.1 grey-hover cp'
              >
                {item.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;
