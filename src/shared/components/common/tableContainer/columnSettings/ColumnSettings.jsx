import React, { useState } from "react";
import { ColumnSettingsIcon } from "./assets";
import "./columnSettingsDropDown.scss";
import { ColumnSettingsDropDown } from "./columnSettingsDropDown";

const ColumnSettings = ({ tableData, setTableContents }) => {
  const [columnDropDown, showColumnDropdown] = useState(false);

  return (
    <div className={"pos-rel"}>
      <div
        onClick={() => showColumnDropdown(!columnDropDown)}
        className={`column-settings cp pt-7 pl-7 pr-7 bdr-r-6 ${
          columnDropDown ? "bg-tertiary" : "bg-white"
        }`}
      >
        <ColumnSettingsIcon columnDropDown={columnDropDown} />
      </div>
      {/* {columnDropDown && (
        <div className='pos-ab r-0 t-60 z-1'>
          <ColumnSettingsDropDown
            showColumnDropdown={showColumnDropdown}
            tableData={tableData}
            setTableContents={setTableContents}
          />
        </div>
      )} */}
    </div>
  );
};

export default ColumnSettings;
