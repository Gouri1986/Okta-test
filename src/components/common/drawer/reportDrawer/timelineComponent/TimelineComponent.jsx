import React from "react";
import InlineBarChart from "./InlineBarChart";
import "./timelineComponent.scss";

const TimelineStatComponent = () => {
  return (
    <div className='bg-lightgrey width100 mb-15 pt-6 pr-9 pl-7'>
      <h3 className='font-14 fw-700 lh-15 f-black'>Assertion Variable</h3>
      <div className='pt-5 pb-5'>
        <InlineBarChart />
      </div>
      <div className='flex-r-ac flex-jc-sp-btn font-10 fw-400 f-darkgrey pb-10'>
        <span>10 executed</span>
        <span>Total 27</span>
      </div>
    </div>
  );
};

const TimelineComponent = ({ index, length }) => {
  return (
    <div className='mb-30 pos-rel flex-r'>
      <div
        className='w-27 h-27 mr-10 bg-MustardYellow'
        style={{ borderRadius: "50%" }}
      ></div>
      <div className='flex-c flex-1'>
        <h2 className='font-16 font-700 lh-15 f-black'>
          Compliance ID: GDPR 4.2
        </h2>
        <div>
          <p className='font-12 lh-15 f-black fw-300 mt-10 mb-10 width100'>
            Scan failed due to vulnerability policy violations: Jenkins Demo, 48
            vulnerabilities, [Critical: 48]
          </p>
        </div>
        <div>
          <TimelineStatComponent />
        </div>
        <div>
          <button
            className='h-30 bg-DarkDesaturatedBlue no-border no-outline'
            style={{ width: "40%" }}
          >
            <span className='review-button font-14 fw-400 lh-15 f-white'>
              Review
            </span>
          </button>
        </div>
      </div>
      {index !== length - 1 && (
        <div className='timeline-connector pos-ab w-5 bg-MustardYellow'></div>
      )}
    </div>
  );
};

export default TimelineComponent;
