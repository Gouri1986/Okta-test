import { Fragment, useState, useRef } from "react";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "./assets";

const PickerRange = () => {
  const [picker, setPicker] = useState([]);
  const flatPicRef = useRef(new Flatpickr());

  const openF = () => {
    flatPicRef.current.flatpickr.open();
  };

  return (
    <Fragment>
      {/* <InputLabel for='range-picker'>Select Dates</InputLabel> */}
      <div className='flatpickr-container flex-r-ac'>
        <Flatpickr
          ref={flatPicRef}
          value={picker}
          id='range-picker'
          className='form-control'
          onChange={(date) => setPicker(date)}
          placeholder='Select Date'
          options={{
            mode: "range",
            defaultDate: ["2020-02-01", "2020-02-15"],
          }}
        />
        <div onClick={openF} className='cp'>
          <CalenderIcon />
        </div>
      </div>
    </Fragment>
  );
};

export default PickerRange;
