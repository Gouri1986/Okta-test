import React from "react";
import ColumnSettingsIcon from "../columnSettings/ColumnSettings";
import Refresh from "../refresh/Refresh";
import Download from "../download/Download";
import { AddNewIcon } from "./assets/index";

function TableSettings() {
  return (
    <div
      style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      className='flex-r-ac flex-jc-sp-btn bg-white p-25'
    >
      <div className='flex-c'></div>
      <div className='flex-r-ac flex-jc-sp-btn'>
        <div className='table-add-icon mr-30 cp pt-7 pl-7 pr-7 bdr-r-6'>
          <AddNewIcon />
        </div>
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
  );
}

export default TableSettings;
