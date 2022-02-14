import React, { useState, useContext } from 'react';

import NewComplainChecked from './NewComplainChecked';
import ApexColumnCharts from '../charts/ApexColumnCharts';
import ApexDonutChart from '../charts/ApexDonutChart';
import CompliancesScanned from './CompliancesScanned';

// importing icons
import tempIcon from './assets/tempIcon.svg';
import more from './assets/more.svg';
import dummyLineChart from './assets/dummyLineChart.svg';
import collapse from './assets/collapse.svg';

export default function Widget() {
  const [showContent, setshowContent] = useState(false);

  const toggleContent = () => {
    showContent ? setshowContent(false) : setshowContent(true);
  };

  return (
    <>
      {showContent ? (
        <div className='wp-100 white-container-br-10 flex-r-jc-ac flex-jc-sp-btn p-10'>
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
              <img className={'rotate-icon'} src={collapse} alt='Collapse' />
            </div>
          </div>
        </div>
      ) : (
        <div className='wp-100 h-120 white-container-br-10 flex-r flex-r-jc-ac flex-jc-sp-btn'>
          <div className='wp-16 hp-80 ml-10 pl-15 pr-15 pt-15 pb-15 purple-container-br-10 flex-r-jc-ac'>
            <CompliancesScanned />
          </div>
          <div className='wp-60 hp-80 ml-20 flex-r-ac orange-container-br-10'>
            <div className='mr-20 ml-20'>
              <img src={tempIcon} alt='icon'></img>
            </div>
            <div className='pr-50'>
              <img alt='line-chart' src={dummyLineChart}></img>
            </div>
          </div>
          <div className='wp-16 hp-80 ml-20 p-15 green-container-br-10'>
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
