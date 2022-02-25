import React, { useEffect, useState } from 'react';
import './RightDrawer.scss';

const RightDrawer = (props) => {
  const { open, close, size, tableTitle, data , children} = props;

  return (
    <div
      className={`complaince-sidebar complaince-sidebar-animation  ${
        open === true ? 'side-on-state' : 'side-off-state'
      } ${
        size === 'sm'
          ? 'wd-sb-sm'
          : size === 'md'
          ? 'wd-sb-md'
          : size === 'lg'
          ? 'wd-sb-lg'
          : size === 'xl'
          ? 'wd-sb-xl'
          : ''
      } `}
    >
    <div className='complaince-sidebar-header'>{children[0]}</div>
      <div className='complaince-sidebar-body'>
       {children[1]}
      </div>
    </div>
  );
};

export default RightDrawer;
