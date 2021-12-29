import React from "react";

const FilterButton = ({ title, colored, onClick }) => {
  return (
    <div
      onClick={() => onClick(false)}
      className={
        colored ? "text-center p-10 mr-10 cp f-white lh-21 font-14 fw-600 flex-1 bg-green bdr-grey-2" 
        : "text-center p-10 flex-1 cp f-white lh-21 font-14 fw-600 bg-transparent bdr-grey-2"
      }
    >
      {title}
    </div>
  );
};

export default FilterButton;
