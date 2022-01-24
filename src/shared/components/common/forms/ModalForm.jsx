import React, { useState, useRef } from "react"
import { Button, Grid } from "@mui/material"
import TextBox from "../inputs/input/TextBox"

import "./ModalForm.scss"

const ModalForm = props => {
  const { tableData, onSubmit, onCancel } = props
  const [inputs, setInputs] = useState({})
  const inputRef = useRef()

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = event => {
    console.log(inputs)
    onCancel()
    setInputs({})
    inputRef.current.reset()
  }

  return (
    <div className="modal-form">
      <form ref={inputRef}>
      <Grid container spacing={2}>
        {tableData?.header?.map((item, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={12}
            md={tableData?.header?.length < 7 ? 12 : 6}
            lg={tableData?.header?.length < 7 ? 12 : 6}
          >
            <TextBox
              type="text"
              // row={}
              madatory={true}
              id={item?.id}
              placeholder={`Enter your ${item.title}`}
              label={item?.title}
              value={inputs?.id ?? ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
      </form>
      <div className="modal-form-footer mt-50">
        <Button className="mr-10 bg-primary" variant="contained" onClick={e => handleSubmit(e)}>
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onCancel()
            setInputs({})
            inputRef.current.reset()
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ModalForm
