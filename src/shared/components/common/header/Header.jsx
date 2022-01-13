import React from 'react';
import {HelpIcon, NotificationIcon} from '../../../assets/images/icons/common';
import User from '../../../assets/images/profile/user.svg';

function Header() {
    return (
        <div>
            <div className="h-100 wp-100 flex-r-ac flex-jc-sp-btn">
                <div className='flex-c'>
                    <p className='f-40 fw-600 fc-primary lh-1-0'>Customer Master</p>
                    <p className='f-14 fw-400 fc-primary ml-3'>Welcome To Customer Master</p>
                </div>
                <div className='flex-r-ac wp-21 flex-jc-sp-btn'>
                    <div className='flex-r-ac'><HelpIcon /></div>
                    <div className='pos-rel mr-15 flex-r-ac'>
                        <NotificationIcon />
                        <div className='pos-ab t--10 l-20 bg-black h-24 w-24 bdr-rp-50 flex-r-jc-ac'>
                            <p className='f-12 fc-tertiary'>2</p>
                        </div>
                    </div>
                    <div className='wp-70 h-72 flex-r-ac white-container-br-5 flex-jc-sp-btn'>
                        <div className='flex-c ml-12 fc-secondary'>
                            <p className='f-16 fw-400 lh-1-5'>Gouri Biswas</p>
                            <p className='f-13 fw-400'>Marketing Administrator</p>
                        </div>
                        <div className='mr-10 h-50'>
                            <img src={User} alt="profile-pic" width="100%" height="100%"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
