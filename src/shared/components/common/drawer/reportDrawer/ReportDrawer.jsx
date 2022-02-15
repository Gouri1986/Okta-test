import React from "react";
import { CloseIcon, PDFIcon } from "./assets";
import "./reportDrawer.scss";
import { TimelineComponent } from "./timelineComponent";

const ReportDrawer = ({ report, showReport }) => {
  const TIMELINE_LENGTH = 4;

  return (
    <div
      className={
        report ? "report-drawer-container-expanded" : "report-drawer-container"
      }
    >
      <div className='report-drawer-header'>
        <span>GCP Compliance Report</span>
        <span>Generated on 20-07-2021 at 10.30 AM</span>

        <span>GCP Project ID: 638548674414</span>
        <button className='generate-button'>
          <PDFIcon />
          <span>Generate Report</span>
        </button>
        <div onClick={() => showReport(!report)} className='close-icon-holder'>
          <CloseIcon />
        </div>
      </div>
      <div className='report-drawer-main'>
        {new Array(TIMELINE_LENGTH).fill("").map((_, index) => (
          <TimelineComponent length={TIMELINE_LENGTH} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ReportDrawer;
