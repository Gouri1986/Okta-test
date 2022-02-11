import React from "react";

const FilterButton = ({ title, colored, onClick }) => {
  return (
    <div
      style={{
        background: colored && "#003ECB",
        borderColor: !colored ? "#003ecb" : "#00000000",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 5,
        color: colored ? "white" : "#003ecb",
      }}
      onClick={() => onClick(false)}
      className={
        colored
          ? "text-center p-10 mr-10 cp lh-2-1 f-14 fw-600 flex-1"
          : "text-center p-10 flex-1 cp lh-2-1 f-14 fw-600"
      }
    >
      {title}
    </div>
  );
};

export default FilterButton;
