import React from 'react';
import dropupgreen from '../../../../assets/images/icons/drop-up-green.svg';
import autofixederror from '../../../../assets/images/icons/autofixederror.svg';

export default function AutoFixxedError() {
    return (
        <div className="flex-r-ac flex-jc-sp-btn fixed-error p-15">
        <div className="flex-c lh-1-2">
            <div className="flex-r align-items-end">
                <div className="f-30 fw-700">52</div>
                <div className="flex-r ml-3 mb-10"><img src={dropupgreen}></img></div>
                <div className="f-10 ml-3 mb-10">+12%</div>
            </div>
            <p className="f-12">AUTOMATICALLY FIXED ERROR</p>
        </div>
        <div className="flex-c"><img src={autofixederror}></img></div>
        </div>
    )
}
