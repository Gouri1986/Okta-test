import React from 'react';
import ColumnSettingsIcon from '../columnSettings/ColumnSettings';
import Refresh from '../refresh/Refresh';
import Download from '../download/Download';

function TableSettings() {
    return (
        <>
            <div className='flex-r-ac flex-jc-sp-btn'>
                <div className='Flex-c'>
                    <div>Filter</div>
                    <div className='flex-r'>
                        <div>Filter Icon</div>
                        <div>filter</div>
                    </div>
                </div>
                <div className='flex-r flex-jc-sp-btn'>
                    <div><ColumnSettingsIcon /></div>
                    <div><Refresh /></div>
                    <div><Download /></div>
                    <div>Add more Icon</div>
                </div>
            </div>
        </>
    )
}

export default TableSettings
