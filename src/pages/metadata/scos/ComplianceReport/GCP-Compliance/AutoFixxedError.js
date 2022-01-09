import React from "react";
import dropupgreen from "../../../../../shared/assets/images/icons/drop-up-green.svg";
import autofixederror from "../../../../../shared/assets/images/icons/autofixederror.svg";

export default function AutoFixxedError() {
  return (
    <div className='flex-r-ac flex-jc-sp-btn fixed-error p-15'>
      <div className='flex-c lh-12'>
        <div className='flex-r align-items-end'>
          <div className='font-30 fw-700'>52</div>
          <div className='flex-r ml-3 mb-10'>
            <img alt='drop-up-green' src={dropupgreen}></img>
          </div>
          <div className='font-10 ml-3 mb-10'>+12%</div>
        </div>
        <p className='font-12'>AUTOMATICALLY FIXED ERROR</p>
      </div>
      <div className='flex-c'>
        <img alt='auto-fix' src={autofixederror}></img>
      </div>
    </div>
  );
}
