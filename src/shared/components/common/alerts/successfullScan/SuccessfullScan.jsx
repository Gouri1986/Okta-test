import React from 'react';
import '../../../../assets/scss/styles.scss';
import success from '../../../../assets/images/icons/success.svg';

export default function SuccessfullScan() {
    return (
    <div className="w-100 flex-r-jc-ac flex-jc-sp-btn bg-success fc-white f-14 fw-600">
        <div className="pt-18 pb-18 pl-60 flex-r">
            <div><img src={success} alt="Sucessfull Scan"></img></div>
            <div className="ml-15">Successfully Scanned the directory</div>
        </div>
        <div className="pt-18 pb-18 pr-60">Dismiss</div>
    </div>
    )
}
