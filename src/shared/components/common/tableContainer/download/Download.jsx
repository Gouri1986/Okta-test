import React from "react";
import "./download.scss";
import { DownloadIcon } from "./asset";
import { tableData } from "../../../db";
const { useState } = React;

const Download = ({ selectedRow, tableContents }) => {
  const [isOpen, setOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (selectedRow, tableData) => {
    console.log(selectedRow);
    console.log(tableContents);

    if (selectedRow.length > 0) {
      console.log("selectedRow", selectedRow);

      downloadCSV(selectedRow);
    } else if (tableContents.data.length > 0) {
      downloadCSV(tableContents.data);
    } else {
      console.log("Table", tableData.data);

      downloadCSV(tableData.data);
    }
  };
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(tableData.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");

    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;
    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csvcharset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div className='dropdown'>
      <div className='dropdown-header cp' onClick={toggleDropdown}>
        {/* {selectedItem ? (
          items.find((item) => item.id == selectedItem).label
        ) : */}

        {/* ( */}
        <DownloadIcon onClick={() => handleItemClick(selectedRow, tableData)} />
        {/* )} */}
      </div>
      {/* <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id}>
            <span className={`dropdown-item-dot ${item.id == selectedItem && 'selected'}`}>• </span>
            {item.label}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Download;
