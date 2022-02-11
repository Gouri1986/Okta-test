import React from "react";
import { RadioButton } from "../assets";

const FilterRadioButton = ({ title, selectedRadio, setSelectedRadio }) => {
  return (
    <div
      onClick={() => setSelectedRadio(title)}
      className='bdr-white-2 cp p-10 flex-1'
    >
      <RadioButton selected={selectedRadio === title} />
      <span className='f-16 fc-black ml-10 lh-2-7'>{title}</span>
    </div>
  );
};

export default FilterRadioButton;
