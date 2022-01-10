import React from "react";
import "./search.scss";
import { SearchIcon } from "./assets";

const Search = (props) => {
  const { searchValue, setSearchValue, isSearchClicked, searchClicked } = props;
  return (
    <div className="flex-r-ac h-40 pos-rel bg-w bdr-lightgrey-1 br-3">
      <div className="search-input-container wp-100">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="wp-100 font-18 fw-400 f-darkgrey pl-10 lh-16 no-bdr no-outline bg-transparent"
        />
      </div>
      <div
        onClick={() => isSearchClicked(!searchClicked)}
        className="search-icon-container mr-5"
      >
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
