import React from 'react';
import complianceScan from './assets/complianceScan.svg';

export default function CompliancesScanned() {
  return (
    <>
      <div className='flex-r-jc-ac wp-100 flex-jc-fs'>
        <div>
          <img src={complianceScan} alt='icon'></img>
        </div>
        <div className='ml-10'>
            <div className='fw-700 f-36 lh-8'>1765</div>
            <div className='fw-400 f-12'>Compliances Scanned</div>
        </div>
      </div>
    </>
  );
}
