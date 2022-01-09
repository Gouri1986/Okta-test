import React, { useState } from "react";
import { ColumnSettingsIcon } from "./assets";
import "./columnSettingsDropDown.scss";
import { ColumnSettingsDropDown } from "./columnSettingsDropDown";

const ColumnSettings = ({ tableData, setTableContents }) => {
  const [columnDropDown, showColumnDropdown] = useState(false);

  return (
    <div className={"pos-rel"}>
      <div onClick={() => showColumnDropdown(!columnDropDown)} className="cp">
        <ColumnSettingsIcon />
      </div>
      {columnDropDown && (
        <div className="pos-ab r-0 t-60 z-1">
          <ColumnSettingsDropDown
            showColumnDropdown={showColumnDropdown}
            tableData={tableData}
            setTableContents={setTableContents}
          />
        </div>
      )}
    </div>
  );
};

export default ColumnSettings;
