import React from "react";

const FilterInput = ({ placeholder }) => {
  return (
    <div className='pb-15'>
      <label className='fc-secondary fw-500'>{placeholder}</label>
      <input className='wp-100 bdr-black-2 bdr-r-6 mt-7 wp-100 no-bdr no-outline f-16 pl-5 pl-7 pr-7 fc-black lh-2-7' />
    </div>
  );
};

export default FilterInput;
