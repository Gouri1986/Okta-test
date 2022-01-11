import React, { useEffect, useState } from "react";
import Search from "../../../search/Search";
import { CloseIcon } from "../assets";

const ColumnSettingsDropDown = ({
  tableData,
  showColumnDropdown,
  setTableContents,
}) => {
  const [columnSettingsSearch, setColumnSettingSearch] = useState("");

  const [checkedColumns, setCheckedColumns] = useState([]);

  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    setCheckedColumns(tableData.header);
    setColumnsToShow(tableData.header);
  }, []);

  const addFilterToColumns = (event) => {
    const { target } = event;
    const { checked, id } = target;
    console.log(checkedColumns);
    console.log(checkedColumns?.findIndex((e) => e.title === target.name));
    const {
      [checkedColumns?.findIndex((e) => e.title === target.name)]: name,
      ...rest
    } = checkedColumns;
    checked
      ? setCheckedColumns([...checkedColumns, { title: target.name, id }])
      : setCheckedColumns(Object.values(rest));
  };

  useEffect(() => {
    checkedColumns.length > 0
      ? setTableContents({
          ...tableData,
          header: checkedColumns,
        })
      : setTableContents(tableData);
  }, [checkedColumns]);

  const onColumnSettingsSearch = (value) => {
    const filtered = tableData.header.filter((head) =>
      head.title.toLowerCase().includes(value.toLowerCase())
    );
    setColumnsToShow(filtered);
    setColumnSettingSearch(value);
  };

  return (
    <div className='p-15 min-w-300 bg-w bdr-lightgrey-1'>
      <div className='flex-r-ac flex-jc-sp-btn'>
        <span className='mb-30 f-16 fw-600 f-DarkDesaturatedBlue'>Column</span>
        <span className='cp' onClick={() => showColumnDropdown(false)}>
          <CloseIcon />
        </span>
      </div>
      <div>
        <Search
          searchValue={columnSettingsSearch}
          setSearchValue={onColumnSettingsSearch}
        />
      </div>
      <span className='pt-15 pb-15 f-10 f-darkgrey'>Frequently Used</span>
      <div className='flex-r-ac '>
        <div>
          {columnsToShow.slice(0, 9).map((e) => (
            <div key={e.id} className='mt-15 mb-15 min-w-200'>
              <label class='col-checkbox-input-container cp cp flex-r-ac pl-25 mb-10 pos-rel'>
                <span className='f-12 f-black ml-8'>{e.title}</span>
                <input
                  name={e.title}
                  id={e.id}
                  onChange={(e) => {
                    addFilterToColumns(e);
                  }}
                  type='checkbox'
                  checked={
                    checkedColumns.filter((ev) => ev.title === e.title).length >
                    0
                  }
                  className="pos-ab cp h-0 w-0"
                />
                <span className="col-checkmark pos-ab t-0 l-0 h-20 w-20 br-4 no-bdr bg-grey"></span>
              </label>
            </div>
          ))}
        </div>
        {new Array(5).fill("").map((_, index) => (
          <div>
            {columnsToShow
              .slice(0 + (index + 10), 9 + (index + 10))
              .map((e) => (
                <div key={e.id} className='mt-15 mb-15 min-w-200'>
                  <label class='col-checkbox-input-container cp flex-r-ac pl-25 mb-10 pos-rel '>
                    <span className='f-12 f-black ml-8'>{e.title}</span>
                    <input
                      name={e.title}
                      id={e.id}
                      onChange={(e) => {
                        addFilterToColumns(e);
                      }}
                      type='checkbox'
                      checked={
                        checkedColumns.filter((ev) => ev.title === e.title)
                          .length > 0
                      }
                      className="pos-ab cp h-0 w-0"
                    />
                    <span className="col-checkmark pos-ab t-0 l-0 h-20 w-20 br-4 no-bdr bg-grey"></span>
                  </label>
                </div>
              ))}
          </div>
        ))}
      </div>
      {tableData.header?.length > 10 && (
        <div className='flex-r-jc-ac p-15'>
          <button className='f-12 cp pt-10 pb-10 pl-25 pr-25 bg-DarkDesaturatedBlue fc-tertiary no-bdr'>
            + More
          </button>
        </div>
      )}
    </div>
  );
};

export default ColumnSettingsDropDown;
