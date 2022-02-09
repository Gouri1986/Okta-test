import React, { useState } from 'react';

import NewComplainChecked from './NewComplainChecked';
import AutoFixxedError from './AutoFixxedError';
import ApexColumnCharts from '../charts/ApexColumnCharts';
import ApexDonutChart from '../charts/ApexDonutChart';
import PickerRange from '../calender/PickerRange';
import '../calender/pickers/flatpickr.scss';

// importing icons
import complianceScan from './assets/complianceScan.svg';
import tempIcon from './assets/tempIcon.svg';
import more from './assets/more.svg';
import dummyLineChart from './assets/dummyLineChart.svg';
import collapse from './assets/collapse.png';

export default function Widget() {
  const [showContent, setshowContent] = useState(false);

  const toggleContent = () => {
    showContent ? setshowContent(false) : setshowContent(true);
  };
  return (
    <>
      {showContent ? (
        <div className='h-307 wp-100 white-container-br-10 flex-r-jc-ac'>
          <div className='flex-r' style={{ width: '81%' }}>
            <div
              className='h-275 flex-c'
              style={{ width: '18%' }}
            >
              <div
                className='flex-r-ac flex-jc-sp-btn h-50'
                style={{ backgroundColor: '#f9f9f9' }}
              >
                <div className='f-grey font-14 fw-600 ml-10'>Chart Title</div>
                <div className='mr-10'>
                  <img src={more} alt='more'></img>
                </div>
              </div>
              <ApexDonutChart />
            </div>
            <div
              className='white-container ml-22 h-275'
              style={{ width: '80%' }}
            >
              <div
                className='flex-r-ac flex-jc-sp-btn h-50'
                style={{ backgroundColor: '#f9f9f9' }}
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
          <div className='flex-r' style={{ width: '19%' }}>
            <div
              className='h-275 flex-c-ac flex-jc-sp-btn ml-22'
              style={{ width: '100%' }}
            >
              <div className='flex-r flex-jc-sp-btn width100'>
                <div>
                  <PickerRange />
                </div>
                <div className='cp' onClick={toggleContent}>
                  <img
                    className={showContent ? ' ' : 'rotate-icon'}
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
        <div className='wp-100 h-150 white-container-br-10 flex-r flex-r-jc-ac flex-jc-sp-btn'>
          <div className='wp-18 hp-80 ml-20 bg-vilot-widget flex-r-jc-ac flex-jc-sp-btn'>
            <div><img src={complianceScan} alt='icon'></img></div>
            <div className='f-white pl-20'>
              <div className='fw-700 f-36 lh-10'>1765</div>
              <div className='fw-400 f-12'>Compliances Scanned</div>
            </div>
          </div>
          <div className='wp-60 hp-80 ml-20 bg-orange-widget  flex-r-jc-ac flex-jc-sp-btn'>
            <div className='ml-20'>
              <img src={tempIcon} alt='icon'></img>
            </div>
            <div className='f-white pl-20 pr-200'>
              <img alt='line-chart' src={dummyLineChart}></img>
            </div>
          </div>
          <div className='wp-18 hp-80 ml-20 bg-green-widget flex-r flex-jc-sp-btn'>
            <NewComplainChecked />
          </div>
          <div className='wp-4 mt-5 ml-20'>
            <div className='cp wp-6'onClick={toggleContent}>
              <img className={showContent ? ' ' : 'rotate-icon'} src={collapse} alt='Collapse'/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
