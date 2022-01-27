import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import TextBox from "../inputs/input/TextBox";
import "./ModalForm.scss";
import { useSelector } from "react-redux";
import { addIAMTableData } from "../../../apis/iam";
import Select from "../inputs/select/Select";

const ModalForm = (props) => {
  const { user } = useSelector((state) => state.userReducer);
  const { form, tableDetails, onCancel, getTable, activeEndPoint } = props;
  const [inputs, setInputs] = useState({});
  const inputRef = useRef();

  const inputForm = form?.filter(
    (e) => !tableDetails.whitelist?.includes(e.id)
  );

  const onTextInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onDropDownChange = (e) => {
    setInputs((values) => ({ ...values, ...e }));
  };

  const handleSubmit = async (event) => {
    await addIAMTableData(activeEndPoint, user, inputs);
    getTable(activeEndPoint);
    onCancel();
    setInputs({});
    inputRef.current.reset();
  };

  return (
    <div className='modal-form'>
      <form ref={inputRef}>
        <Grid container spacing={2}>
          {inputForm.map((item, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={12}
              md={inputForm.length < 7 ? 12 : 6}
              lg={inputForm.length < 7 ? 12 : 6}
            >
              {item.dropdown ? (
                <Select
                  item={item}
                  value={inputs?.id ?? ""}
                  onChange={onDropDownChange}
                />
              ) : (
                <TextBox
                  type='text'
                  madatory={true}
                  id={item?.id}
                  placeholder={`Enter your ${item.title}`}
                  label={item?.title}
                  value={inputs?.id ?? ""}
                  onChange={onTextInputChange}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </form>
      <div className='modal-form-footer mt-50'>
        <Button
          className='mr-10 bg-primary'
          variant='contained'
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            onCancel();
            setInputs({});
            inputRef.current.reset();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ModalForm;
