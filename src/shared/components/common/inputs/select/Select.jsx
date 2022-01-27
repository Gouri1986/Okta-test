import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./select.scss";

const DropDownArrow = () => {
  return (
    <svg
      width='11'
      height='7'
      viewBox='0 0 11 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.87091 6.17616L0.390107 1.69533C0.174001 1.47922 0.174001 1.12886 0.390107 0.912777L0.912721 0.390162C1.12846 0.174426 1.4781 0.17401 1.69435 0.38924L5.2622 3.94038L8.83003 0.38924C9.04627 0.17401 9.39592 0.174426 9.61166 0.390162L10.1343 0.912777C10.3504 1.12888 10.3504 1.47924 10.1343 1.69533L5.65349 6.17616C5.43738 6.39224 5.08702 6.39224 4.87091 6.17616Z'
        fill='#1A203D'
      />
    </svg>
  );
};

const Dropdown = (props) => {
  const { item = {}, onChange } = props;
  const { title = "", id = "", dropdown = {} } = item;

  const [dropDownData, setDropDownData] = useState([]);
  const [selected, setSelected] = useState("");

  const getDropDownData = async () => {
    const response = await axios.get(dropdown?.dropdown);
    setDropDownData(response.data?.data);
  };

  useEffect(() => {
    if (dropdown.dynamic) {
      getDropDownData();
    } else {
      setDropDownData(dropdown.dropdown);
    }
  }, []);

  useEffect(() => {
    if (dropdown.dynamic) {
      if (selected?.length > 0) {
        onChange(
          dropDownData.find((e) => e[dropdown?.displayKey] === selected)
        );
      }
    } else {
      onChange({ [id]: selected });
    }
  }, [selected]);

  return dropdown.dynamic ? (
    <div key={id} className='flex-c'>
      <label className='dropdown-label'>{title}</label>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'></InputLabel>
        <Select
          displayEmpty
          id={id}
          className='p-0'
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          IconComponent={() => (
            <div className='flex-r-ac pr-15'>
              <span className='select-dropdown-icon pr-5'>Select</span>
              <DropDownArrow />
            </div>
          )}
          renderValue={(v) => {
            if (v) {
              return v;
            }
            return <span className='select-placeholder'>{title}</span>;
          }}
        >
          {dropDownData?.map((e) => {
            return (
              <MenuItem value={e[dropdown?.displayKey]}>
                {e[dropdown?.displayKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  ) : (
    <div key={id} className='flex-c'>
      <label className='dropdown-label'>{title}</label>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'></InputLabel>
        <Select
          displayEmpty
          id={id}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          IconComponent={() => (
            <div className='flex-r-ac pr-15'>
              <span className='select-dropdown-icon pr-5'>Select</span>
              <DropDownArrow />
            </div>
          )}
          renderValue={(v) => {
            if (v) {
              return v;
            }
            return <span className='select-placeholder'>{title}</span>;
          }}
        >
          {dropDownData.map((e) => {
            return <MenuItem value={e}>{e}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
