import React from "react";
import dropupgreen from "../../../../assets/images/icons/drop-up-green.svg";
import compliencechecked from "../../../../assets/images/icons/compliencechecked.svg";

export default function NewComplainChecked() {
  return (
    <div className='flex-r-ac flex-jc-sp-btn new-checked  pt-50 pl-10 pb-15'>
      <div className='flex-c lh-12'>
        <div className='flex-r align-items-end'>
          <div className='font-30 fw-700'>1276</div>
          <div className='flex-r ml-3 mb-10'>
            <img alt='drop-up-green' src={dropupgreen}></img>
          </div>
          <div className='font-10 ml-3 mb-10'>+3%</div>
        </div>
        <p className='font-12'>NEW COMPLIANCES CHECKED</p>
      </div>
      <div className='flex-c'>
        <img alt='new-compliances-checked' src={compliencechecked}></img>
      </div>
    </div>
  );
}
