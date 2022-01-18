import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  HelpIcon,
  NotificationIcon,
} from "../../../assets/images/icons/common";
import User from "../../../assets/images/profile/user.svg";
import { getTableTitleNameFromRoutes } from "../../../utils/getApiEndpointFromRoutes";
import { getSpacedDisplayName } from "../../../utils/table";

function Header({ tableTitle }) {
  return (
    <div className='h-100 flex-r-ac flex-jc-sp-btn'>
      <div className='flex-c'>
        {tableTitle && (
          <>
            <p className='f-40 fw-600 fc-primary lh-1-0'>{tableTitle}</p>
            <p className='f-14 fw-400 fc-primary ml-3'>
              Welcome To {tableTitle}
            </p>
          </>
        )}
      </div>
      <div className='flex-r-ac wp-23 flex-jc-sp-btn'>
        <div className='flex-r-ac mr-15'>
          <HelpIcon />
        </div>
        <div className='pos-rel mr-30 flex-r-ac'>
          <NotificationIcon />
          <div className='pos-ab t--10 l-20 bg-black h-24 w-24 bdr-rp-50 flex-r-jc-ac'>
            <p className='f-12 fc-tertiary'>2</p>
          </div>
        </div>
        <div className='wp-100 flex-r-ac white-container-br-5 flex-jc-sp-btn p-10'>
          <div className='flex-c fc-secondary mr-30'>
            <span className='f-16 fw-400 lh-1-5'>Gouri Biswas</span>
            <span className='f-13 fw-400'>Marketing Administrator</span>
          </div>
          <div className='min-w-60 flex-r-ac'>
            <img src={User} alt='profile-pic' width='100%' height='100%'></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
