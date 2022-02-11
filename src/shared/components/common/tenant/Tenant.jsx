import React from 'react';
import greyarrow from './assets/grey-arrow.svg';

function Tenant() {
  return(
    <>
       <div className='flex-r'>
           <p className=''>Cloud Tenant ID:</p>
           <span className='ml-2 fc-tertiary'>bds6445934735</span>
           <div className='ml-10 mr-5'>
               <img src={greyarrow}></img>
           </div>
       </div>
    </>
  )
}

export default Tenant;


