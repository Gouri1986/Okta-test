import React from "react";
import ColumnSettingsIcon from "../columnSettings/ColumnSettings";
import Refresh from "../refresh/Refresh";
import Download from "../download/Download";
import { AddNewIcon } from "./assets";
import {
  FilterSettingIcon,
  FilterSearchIcon,
  FilterCloseIcon,
} from "../filter/assets";
import FilterSearch from "../filter/filterSearch/FilterSearch";

function TableSettings(props) {
  const { modalOnClick, tableTitle } = props;
  return (
    <div className='flex-c pos-rel'>
      <div className="flex-r-jc-ac pos-ab r-10 t--41">
        <div className="mr-20 tab">Tab One</div>
        <div className="mr-20 tab">Tab Two</div>
        <div className="mr-20 tab">Tab Three</div>
        <div className="mr-20 tab">Tab Four</div>
      </div>
      <div className='flex-r-ac flex-jc-sp-btn pt-10 pb-10'>
        <div className='fw-600 f-20 fc-primary'>{tableTitle}</div>
        <div
          className='lightblue-container-br-5 flex-r flex-r-ac flex-jc-sp-btn pl-24 pr-24 pb-10 pt-10 cp'
          onClick={modalOnClick}
        >
          <AddNewIcon />
          <p className='font-16 fw-600 fc-white pl-10'>Add New</p>
        </div>
      </div>
      <div className='flex-r-ac flex-jc-sp-btn'>
        <div className='flex-r wp-30 flex-r-ac flex-jc-sp-btn'>
          <FilterSearch />
        </div>
        <div className='flex-r-ac flex-jc-sp-btn'>
          <div className='mr-30'>
            <ColumnSettingsIcon />
          </div>
          <div className='mr-30'>
            <Refresh />
          </div>
          <div>
            <Download />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSettings;
