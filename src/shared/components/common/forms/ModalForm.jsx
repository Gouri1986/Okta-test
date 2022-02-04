import React, { useState, useRef, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import TextBox from "../inputs/input/TextBox";
import "./ModalForm.scss";
import { useSelector } from "react-redux";
import Select from "../inputs/select/Select";
import Checkbox from "../inputs/checkbox/Checkbox";
import { addTableData, updateTableData } from "../../../apis/table/table";

const ModalForm = (props) => {
  const { user } = useSelector((state) => state.userReducer);

  const {
    form,
    tableDetails,
    onCancel,
    getTable,
    activeEndPoint,
    CRUDModalType,
    openCRUDModal,
    activeData,
    baseUrl,
  } = props;

  const [inputs, setInputs] = useState({});
  const inputRef = useRef();

  console.log(CRUDModalType);

  useEffect(() => {
    if (CRUDModalType === "update") {
      setInputs(activeData);
    }
  }, [activeData]);

  useEffect(() => {
    if (CRUDModalType === "add") {
      setInputs({});
    }
  }, [openCRUDModal]);

  const inputForm = form?.filter(
    (e) => !tableDetails.whitelist?.includes(e.id)
  );

  const onTextInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onDropDownChange = (v) => {
    setInputs((values) => ({ ...values, ...v }));
  };

  const onCheckboxChange = (v) => {
    setInputs((values) => ({ ...values, ...v }));
  };

  const handleSubmit = async () => {
    if (CRUDModalType === "add") {
      await addTableData(baseUrl + activeEndPoint, user, inputs);
    } else {
      await updateTableData(baseUrl + activeEndPoint, user, inputs);
    }
    getTable(activeEndPoint);
    onCancel();
    setInputs({});
    inputRef.current.reset();
  };

  return (
    <div className='modal-form'>
      <form ref={inputRef}>
        <Grid container spacing={2}>
          {inputForm?.map((item, i) => {
            let visibilityDependencyValue = item.visibilitydependency?.value;
            let visibilityDependencyParent = item.visibilitydependency?.parent;
            if (visibilityDependencyValue) {
              return (
                inputs[visibilityDependencyParent]?.toLowerCase() ===
                  visibilityDependencyValue?.toLowerCase() && (
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
                        value={inputs[item?.id] ?? ""}
                        inputs={inputs}
                        onChange={onDropDownChange}
                      />
                    ) : item.checkbox ? (
                      <Checkbox
                        label={item?.title}
                        item={item}
                        onChange={onCheckboxChange}
                      />
                    ) : (
                      <TextBox
                        type='text'
                        madatory={true}
                        id={item?.id}
                        placeholder={`Enter your ${item.title}`}
                        label={item?.title}
                        value={inputs[item?.id] ?? ""}
                        onChange={onTextInputChange}
                      />
                    )}
                  </Grid>
                )
              );
            } else {
              return (
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
                      value={inputs[item?.id] ?? ""}
                      inputs={inputs}
                      onChange={onDropDownChange}
                    />
                  ) : item.checkbox ? (
                    <Checkbox
                      label={item?.title}
                      item={item}
                      onChange={onCheckboxChange}
                    />
                  ) : (
                    <TextBox
                      type='text'
                      madatory={true}
                      id={item?.id}
                      placeholder={`Enter your ${item.title}`}
                      label={item?.title}
                      value={inputs[item?.id] ?? ""}
                      onChange={onTextInputChange}
                    />
                  )}
                </Grid>
              );
            }
          })}
        </Grid>
      </form>
      <div className='modal-form-footer mt-50'>
        <Button
          className='mr-10 bg-primary'
          variant='contained'
          onClick={(e) => handleSubmit(e)}
        >
          {CRUDModalType === "add" ? "Submit" : "Update"}
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
