import React, { useState } from "react";
import collapse from "../../../../../shared/assets/images/icons/collapse.png";

import NewComplainChecked from "./NewComplainChecked";
import AutoFixxedError from "./AutoFixxedError";
import ApexColumnCharts from "../../../../../shared/components/common/charts/ApexColumnCharts";
import ApexDonutChart from "../../../../../shared/components/common/charts/ApexDonutChart";
import PickerRange from "../../../../../shared/components/common/calender/PickerRange";
import "../../../../../shared/components/common/calender/pickers/flatpickr.scss";

// importing icons
import complianceScan from "../../../../../shared/assets/images/icons/complianceScan.svg";
import tempIcon from "../../../../../shared/assets/images/icons/tempIcon.svg";
import more from "../../../../../shared/assets/images/icons/more.svg";
import dummyLineChart from "../../../../../shared/assets/images/icons/dummyLineChart.svg";

export default function ComplienceIntro() {
  const [showContent, setshowContent] = useState(false);

  const toggleContent = () => {
    showContent ? setshowContent(false) : setshowContent(true);
  };
  return (
    <div>
      {showContent ? (
        <div className='grey-container flex-r-jc-ac h-307 width100'>
          <div className='flex-r' style={{ width: "81%" }}>
            <div
              className='white-container h-275 flex-c'
              style={{ width: "18%" }}
            >
              <div
                className='flex-r-ac flex-jc-sp-btn h-50'
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div className='f-grey font-14 fw-600 ml-10'>Chart Title</div>
                <div className='mr-10'>
                  <img src={more} alt='more'></img>
                </div>
              </div>
              <div>
                <ApexDonutChart />
              </div>
            </div>
            <div
              className='white-container ml-22 h-275'
              style={{ width: "80%" }}
            >
              <div
                className='flex-r-ac flex-jc-sp-btn h-50'
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div className='f-grey font-14 fw-600 ml-10'>Chart Title</div>
                <div className='mr-10'>
                  <img src={more} alt='more'></img>
                </div>
              </div>
              <div>
                <ApexColumnCharts />
              </div>
            </div>
          </div>

          <div className='flex-r' style={{ width: "19%" }}>
            <div
              className='h-275 flex-c-ac flex-jc-sp-btn ml-22'
              style={{ width: "100%" }}
            >
              <div className='flex-r flex-jc-sp-btn width100'>
                <div>
                  <PickerRange />
                </div>
                <div className='cp' onClick={toggleContent}>
                  <img
                    className={showContent ? " " : "rotate-icon"}
                    src={collapse}
                    alt='Collapse'
                  />
                </div>
              </div>
              <div className='h-100 width100'>
                <NewComplainChecked />
              </div>
              <div className='h-100 width100'>
                <AutoFixxedError />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='grey-container flex-r h-150 width100 flex-r'>
            <div
              className='flex-r-jc-ac flex-jc-sp-btn'
              style={{ width: "81%" }}
            >
              <div
                className='pl-20 pr-20 h-115 blue-container flex-r-jc-ac flex-jc-sp-btn'
                style={{ width: "25%" }}
              >
                <div>
                  <img src={complianceScan} alt='icon'></img>
                </div>
                <div className='f-white pl-20'>
                  <div className='fw-700 font-36 lh-10'>1765</div>
                  <div className='fw-400 font-12'>Compliances Scanned</div>
                </div>
              </div>
              <div
                className='ml-20 h-115 blue-container flex-r-jc-ac flex-jc-sp-btn'
                style={{ width: "75%" }}
              >
                <div className='ml-20'>
                  <img src={tempIcon} alt='icon'></img>
                </div>
                <div className='f-white pl-20 pr-200'>
                  <img alt='line-chart' src={dummyLineChart}></img>
                </div>
              </div>
            </div>
            <div className='ml-20 mt-5' style={{ width: "19%" }}>
              <div className='flex-r flex-jc-sp-btn width100'>
                <div style={{ width: "92%" }}>
                  {/* <div className="w-150"> */}
                  <PickerRange />
                  {/* </div> */}
                </div>
                <div
                  style={{ width: "6%" }}
                  className='cp'
                  onClick={toggleContent}
                >
                  <img
                    className={showContent ? " " : "rotate-icon"}
                    src={collapse}
                    alt='Collapse'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
