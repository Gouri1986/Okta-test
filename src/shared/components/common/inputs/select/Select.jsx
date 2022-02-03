// React Imports
import React, { useEffect, useState } from "react";
// Axios Import
import axios from "axios";
// Mui Inputs Imports
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// Stylesheet import
import "./select.scss";

/**
 * SVG React component
 * @returns vector image of custom dropdown used the select component
 *
 */

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

const DynamicDropdown = ({ item, dropDownData, value, setSelected }) => {
  const { title = "", id = "", dropdown = {} } = item;

  return (
    <div key={id} className='flex-c'>
      <label className='dropdown-label'>{title}</label>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'></InputLabel>
        <Select
          displayEmpty
          id={id}
          className='p-0'
          value={value}
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
  );
};

const StaticDropdown = ({ item, dropDownData, value, setSelected }) => {
  const { title = "", id = "" } = item;

  return (
    <div key={id} className='flex-c'>
      <label className='dropdown-label'>{title}</label>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'></InputLabel>
        <Select
          displayEmpty
          id={id}
          value={value}
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

const Dropdown = (props) => {
  /**
   * item - column info
   * onChange - onChange function in the modal form to set dropdwon value to the form,
   * inputs - moadal form inputs which will be new after every onChange calls
   * value - value of a particular input(dropdown)
   */
  const { item = {}, onChange, inputs, value } = props;
  /**
   * id of the column/dropdown
   * dropdown info of the column
   */
  const { id = "", dropdown = {} } = item;

  const [dropDownData, setDropDownData] = useState([]); // state to set dropdown values
  const [selected, setSelected] = useState(""); // state to set selected dropdown value

  /**
   * function to fecth dynamic dropdown
   */
  const getDropDownData = async () => {
    const { dropdown: api } = dropdown; //api url to fetch the dropdown values
    try {
      const response = await axios.get(api);
      const { data } = response;
      setDropDownData(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * get the dropdown data by passing the params in the required fields
   */

  const getDropDownDataWidthParams = async (params) => {
    if (params && inputs[params]) {
      try {
        const response = await axios.get(
          dropdown?.dropdown + "?" + params + "=" + inputs[dropdown.params]
        );
        const { data } = response;
        setDropDownData(data.data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const { dynamic, params } = dropdown;
    if (dynamic && params) {
      getDropDownDataWidthParams(params);
    }
  }, [inputs[dropdown.params]]);

  useEffect(() => {
    // destructuring nested dependency keys
    const { nestedArrayKey, nestedArrayDependencyKey } = dropdown;
    //check if the inputs and current dropdwon has values dependency
    if (nestedArrayKey && inputs[nestedArrayDependencyKey]) {
      setDropDownData(inputs[nestedArrayKey]);
    }
  }, [inputs]);

  useEffect(() => {
    const { dynamic } = dropdown;
    // destructuring dynamic key to check if the cloumn's dropdown is dynamic
    dynamic ? getDropDownData() : setDropDownData(dropdown.dropdown);
  }, [dropdown]);

  useEffect(() => {
    // this useeffect will be called on every select change

    if (dropdown.dynamic) {
      /**
       *
       * if dynamic set the value with respect to the display key
       */
      if (selected?.length > 0) {
        onChange(
          dropDownData?.find((e) => e[dropdown?.displayKey] === selected)
        );
      }
    } else {
    /**
     * else set the static value directly with id as key
     *
     */
      onChange({ [id]: selected });
    }
  }, [selected]);

  return dropdown.dynamic ? (
    <DynamicDropdown
      item={item}
      dropDownData={dropDownData}
      value={value}
      setSelected={setSelected}
    />
  ) : (
    <StaticDropdown
      item={item}
      dropDownData={dropDownData}
      value={value}
      setSelected={setSelected}
    />
  );
};

export default Dropdown;
