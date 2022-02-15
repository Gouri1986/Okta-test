import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  HelpIcon,
  NotificationIcon,
} from "../../../assets/images/icons/common";
import User from "../../../assets/images/profile/user.svg";
import Search from "../search/Search";

function Header() {
  return (
    <div className='hp-100 wp-100 flex-r-ac flex-jc-sp-btn'>
      <div className='hp-50 wp-55 flex-r-ac'>
        <Search />
      </div>
      <div className='flex-r-ac flex-jc-sp-btn'>
        <div className='flex-r-ac mr-15'>
          <HelpIcon />
        </div>
        <div className='pos-rel mr-30 flex-r-ac'>
          <NotificationIcon />
          <div className='pos-ab t--10 l-20 bg-black h-24 w-24 bdr-rp-50 flex-r-jc-ac'>
            <p className='f-12 fc-white'>2</p>
          </div>
        </div>
        <div className='min-w-60 flex-r-ac bdr-rp-50 bdr-white-5'>
          <img src={User} alt='profile-pic' width='100%' height='100%'></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
