import React from 'react';
import '../../../../assets/scss/styles.scss';
import fail from '../../../../assets/images/icons/fail.svg';


export default function ScanFail() {
    return (
        <div className="width100 flex-r-jc-ac flex-jc-sp-btn bg-red f-white font-14 fw-600">
            <div className="pt-18 pb-18 pl-60 flex-r">
                <div><img src={fail} alt="Scan Fail"></img></div>
                <div className="ml-15">Successfully Scanned the directory</div>
            </div>
            <div className="pt-18 pb-18 pr-60">Dismiss</div>
        </div>
    )
}
