import React, { useState, useContext } from "react";

import NewComplainChecked from "./NewComplainChecked";
import ApexColumnCharts from "../charts/ApexColumnCharts";
import ApexDonutChart from "../charts/ApexDonutChart";
import CompliancesScanned from "./CompliancesScanned";

// importing icons
import tempIcon from "./assets/tempIcon.svg";
import more from "./assets/more.svg";
import dummyLineChart from "./assets/dummyLineChart.svg";
import collapse from "./assets/collapse.svg";
import Views from "../tableContainer/views/Views";
import DatePicker from "react-date-picker";

export default function Widget() {
  const [showContent, setshowContent] = useState(false);
  const [selectedViewType, setSelectedViewType] = useState(0);
  const [selectedApplicableType, setSelectedApplicableType] = useState(1);
  const viewTypes = ["CTG", "Cloud"];
  const applicableType = ["All", "Applicable", "Non-Applicable"];
  const [value, onChange] = useState(new Date());

  const toggleContent = () => {
    showContent ? setshowContent(false) : setshowContent(true);
  };

  return (
    <>
      {showContent ? (
        <div className='wp-100 white-container-br-10 p-10'>
          <div className='flex-r-ac flex-jc-sp-btn mt-5 mb-20 mr-80'>
            <div>
              <Views
                type={"Resources"}
                selectedViewType={selectedViewType}
                setSelectedViewType={setSelectedViewType}
                viewTypes={viewTypes}
                applicableType={applicableType}
              />
            </div>
            <div className='flex-r-ac'>
              <Views
                selectedViewType={selectedApplicableType}
                setSelectedViewType={setSelectedApplicableType}
                viewTypes={applicableType}
                applicableType={applicableType}
              />
              <div className='ml-30'>
                <DatePicker
                  className={"bdr-r-10"}
                  value={value}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className=' flex-r-jc-ac flex-jc-sp-btn'>
            <div className='flex-r wp-95'>
              <div className='flex-c wp-25 bg-secondary bdr-r-br-10 bdr-r-bl-10'>
                <div className='flex-r-ac flex-jc-sp-btn h-50 bg-primary bdr-r-tl-10 bdr-r-tr-10'>
                  <div className='fc-white f-18 fw-600 ml-10'>Pie Chart</div>
                  <div className='mr-10'>
                    <img src={more} alt='more'></img>
                  </div>
                </div>
                <div className='bg-secondary bdr-r-br-10 bdr-r-bl-10'>
                  <ApexDonutChart />
                </div>
              </div>
              <div className='ml-22 wp-75 bg-secondary bdr-r-br-10 bdr-r-bl-10'>
                <div className='flex-r-ac flex-jc-sp-btn h-50 bg-primary bdr-r-tl-10 bdr-r-tr-10'>
                  <div className='fc-white f-18 fw-600 ml-10'>Line Chart</div>
                  <div className='mr-10'>
                    <img src={more} alt='more'></img>
                  </div>
                </div>
                <div className='bg-secondary'>
                  <ApexColumnCharts />
                </div>
              </div>
            </div>
            <div className='wp-5 p-22 flex-r-jc-ac bdr-rp-50'>
              <div
                className='cp wp-100 hp-100 text-center'
                onClick={toggleContent}
              >
                <img className={"rotate-180"} src={collapse} alt='Collapse' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='wp-100 h-120 white-container-br-10 flex-r flex-r-jc-ac flex-jc-sp-btn'>
          <div className='wp-16 hp-80 ml-10 pl-15 pr-15 pt-15 pb-15 purple-container-br-10 flex-r-jc-ac'>
            <CompliancesScanned />
          </div>
          <div className='wp-57 hp-80 ml-20 flex-r-ac orange-container-br-10'>
            <div className='mr-20 ml-20'>
              <img src={tempIcon} alt='icon'></img>
            </div>
            <div className='pr-50'>
              <img alt='line-chart' src={dummyLineChart}></img>
            </div>
          </div>
          <div className='wp-18 hp-80 ml-20 p-15 green-container-br-10'>
            <NewComplainChecked />
          </div>
          <div className='mr-10 ml-5 flex-r-jc-ac'>
            <div
              className='cp wp-100 hp-100 text-center'
              onClick={toggleContent}
            >
              <img src={collapse} alt='Collapse' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
