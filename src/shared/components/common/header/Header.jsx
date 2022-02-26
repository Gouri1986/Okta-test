import React from "react";
import {
  HelpIcon,
  NotificationIcon,
} from "../../../assets/images/icons/common";
import "./header.scss";
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
        <div className='w-50 h-50 flex-r-ac bdr-r-25 bdr-white-5'>
          <img
            src={
              "https://images.pexels.com/photos/3201630/pexels-photo-3201630.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            }
            alt='profile-pic'
            className='user-profile'
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
