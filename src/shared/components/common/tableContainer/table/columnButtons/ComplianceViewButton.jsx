import React from "react";
import {DoubleArrow} from '../assets'

const ComplianceViewButton = ({ dark, onClick }) => {
  return (
    <div
      className={
        dark
          ? "bg-black flex-r-jc-ac p-8  bdr-r-8"
          : "bg-secondary flex-r-jc-ac p-8  bdr-r-8 w-100"
      }
      onClick={onClick}
    >
      <span
        className={` ${
          dark ? "fc-white" : "fc-secondary"
        } f-14 lh-2.1 fw-500 mr-10`}
      >
        View
      </span>
      <DoubleArrow />
    </div>
  );
};

export default ComplianceViewButton;
