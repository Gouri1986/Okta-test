import React from "react"
import Slider from "@mui/material/Slider"
import './rangeSlider.scss'

const RangeSlider = props => {
  const { marks, defaultValue, handleFunction } = props

  const handleChange = e => {
    return marks?.filter(item => item.value === e.target.value)[0]?.label
  }

  function valueLabelFormat(value) {
    return marks?.filter(e => e.value === value)[0]?.label
  }

  return (
    <Slider
      aria-label="Restricted values"
      defaultValue={defaultValue}
      valueLabelFormat={valueLabelFormat}
      step={null}
      valueLabelDisplay="auto"
      marks={marks}
      onChange={e => handleFunction(marks?.filter(item => item.value === e.target.value)[0]?.label)}
    />
  )
}

export default RangeSlider
