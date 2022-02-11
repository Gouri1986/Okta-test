import React, { useEffect, useState } from 'react';
import { getSpacedDisplayName } from '../../../../utils/table';
import './RightDrawer.scss';

const RightDrawer = (props) => {
  const { open, close, size, tableTitle, data , children} = props;

  return (
    <div
      className={`sidebar sidebar-animation ${
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
      <h2 className='table-title'>
        {tableTitle}
        <button onClick={() => close()} className='sidebar-btn'>
          &times;
        </button>
      </h2>
      <div className='sidebar-body'>
        {Object.keys(data).map((datum) => (
          <div className='flex-c mb-10'>
            <span className='column-name'>{getSpacedDisplayName(datum)}</span>
            <span className='column-data'>{data[datum]}</span>
          </div>
        ))}
      </div>
      {/* <TreeView /> */}
    </div>
  );
};

export default RightDrawer;
