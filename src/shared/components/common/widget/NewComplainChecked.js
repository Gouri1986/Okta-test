import React from 'react';
import dropupgreen from './assets/drop-up-green.svg';
import compliencechecked from './assets/compliencechecked.svg';

export default function NewComplainChecked() {
  return (
    <div className='wp-100 flex-r-ac flex-jc-fs'>
       <div className='flex-c'>
        <img alt='new-compliances-checked' src={compliencechecked}></img>
      </div>
      <div className='flex-c lh-12 ml-10'>
        <div className='flex-r flex-align-items-end'>
          <div className='f-30 fw-700'>1276</div>
          <div className='flex-r ml-3 mb-10'>
            <img alt='drop-up-green' src={dropupgreen}></img>
          </div>
          <div className='f-10 ml-3 mb-10'>+12%</div>
        </div>
        <p className='f-12'>NEW COMPLIANCES CHECKED</p>
      </div>
    </div>
  );
}
