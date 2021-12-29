import React from 'react';
import dropupgreen from '../../../../assets/images/icons/drop-up-green.svg';
import compliencechecked from '../../../../assets/images/icons/compliencechecked.svg';


export default function NewComplainChecked() {
    return (
        <div className="flex-r-ac flex-jc-sp-btn new-checked p-15">
        <div className="flex-c lh-12">
            <div className="flex-r align-items-end">
                <div className="font-30 fw-700">1276</div>
                <div className="flex-r ml-3 mb-10"><img src={dropupgreen}></img></div>
                <div className="font-10 ml-3 mb-10">+3%</div>
            </div>
            <p className="font-12">NEW COMPLIANCES CHECKED</p>
        </div>
        <div className="flex-c"><img src={compliencechecked}></img></div>
        </div>
    )
}
