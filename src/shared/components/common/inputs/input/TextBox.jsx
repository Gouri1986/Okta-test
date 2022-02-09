import React from "react";
import "./TextBox.scss";

const TextBox = (props) => {
  const {
    label,
    id,
    type,
    row,
    madatory,
    value,
    defaultValue,
    placeholder,
    onChange,
    handleClear,
  } = props;

  return (
    <div>
      <label className='text-box-label'>{label}</label>
      {madatory !== undefined && madatory === true ? <span>*</span> : ""}
      {type === "text" ? (
        <input
          className='text-box mt-6'
          id={id}
          placeholder={placeholder}
          type='text'
          name={id}
          value={value}
          onChange={onChange}
        />
      ) : type === "textarea" ? (
        <textarea
          className='textarea mt-6'
          id={id}
          placeholder={placeholder}
          rows={row}
          onChange={onChange}
        ></textarea>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextBox;
