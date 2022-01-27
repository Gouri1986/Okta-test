import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const FormCheckbox = (props) => {
  const { label = "", item = {}, onChange } = props;
  const { checkbox = {}, id = "" } = item;
  const [checkboxData, setCheckboxData] = useState([]);
  const [checked, setChecked] = useState([]);
  const location = useLocation();

  const getDropDownData = async () => {
    const response = await axios.get(checkbox.api);
    setCheckboxData(response.data?.data);
    console.log(response.data?.data);
  };

  useEffect(() => {
    checkbox && getDropDownData();
  }, [location.pathname]);

  useEffect(() => {
    if (checked) {
      onChange({ [id]: checked });
    }
  }, [checked]);

  return (
    <div className='flex-c'>
      <span className='checkbox-label'>{label}</span>
      <div className='flex-r-ac'>
        {checkboxData.map((datum) => (
          <div className='flex-r-ac'>
            <Checkbox
              checked={checked.find(
                (e) => e[checkbox.displayKey] === datum[checkbox.displayKey]
              )}
              onChange={() => {
                if (
                  checked.find(
                    (e) => e[checkbox.displayKey] === datum[checkbox.displayKey]
                  )
                ) {
                  const checkeditems = checked.filter(
                    (e) => e[checkbox.displayKey] !== datum[checkbox.displayKey]
                  );
                  setChecked(checkeditems);
                } else {
                  setChecked([...checked, datum]);
                }
              }}
            />
            <span className='checkbox-label'>{datum[checkbox.displayKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCheckbox;
