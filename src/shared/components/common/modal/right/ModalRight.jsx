import React, { useEffect, useState } from 'react';
import { getSpacedDisplayName } from '../../../../utils/table';
import TreeView from '../../treeView/TreeView';
import './ModalRight.scss';

const ModalRight = (props) => {
  const { open, close, size, tableTitle, data } = props;

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
      <button onClick={() => close()} className='sidebar-btn'>
        &times;
      </button>
      <h2 className='table-title'>{tableTitle}</h2>
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

export default ModalRight;
