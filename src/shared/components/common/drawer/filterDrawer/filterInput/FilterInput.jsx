import React from "react";

const FilterInput = ({ placeholder }) => {
  return (
    <div className="bg-w mt-20 mb-20 bdr-grey-1">
      <input placeholder={placeholder} className="wp-100 no-bdr no-outline f-18 p-10 fc-primary lh-2-7"/>
    </div>
  );
};

export default FilterInput;
