import React from "react";
import "./search.scss";
import { SearchIcon } from "./assets";

const Search = (props) => {
  const { searchValue, setSearchValue, isSearchClicked, searchClicked } = props;
  return (
    <div className="flex-r-ac pos-rel bg-white bdr-lightgrey-1 bdr-r-10 wp-100 hp-100">
      <div className="search-input-container wp-100 hp-100">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="wp-100 hp-100 f-18 fw-500 fc-tertiary pl-8 lh-1-6 no-bdr no-outline bg-transparent"
        />
      </div>
      <div
        onClick={() => isSearchClicked(!searchClicked)}
        className="search-icon-container pr-15"
      >
        <SearchIcon />
      </div>
    </div>
  );
};

export default Search;
