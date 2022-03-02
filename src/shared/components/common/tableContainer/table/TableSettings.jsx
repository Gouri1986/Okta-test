import React, { useEffect } from "react";
import ColumnSettingsIcon from "../columnSettings/ColumnSettings";
import Views from "../views/Views";
import Refresh from "../refresh/Refresh";
import Download from "../download/Download";
import { AddNewIcon } from "./assets";
import FilterSearch from "../filter/filterSearch/FilterSearch";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {CtGroupIcon} from './assets';
import {CtIcon} from './assets';
import {AwsCloudIcon} from './assets';
import {GlobalRegionIcon} from './assets';
import {RedCloseIcon} from './assets';
import {BlueDropdownArrow} from './assets';

function TableSettings(props) {
  const { modalOnClick, hideAdd, tabs, showDefaultSelectedFilter} = props;
  const history = useHistory();
  const location = useLocation();

  return (
    <div className='flex-c pos-rel'>
      <div className='flex-r-jc-ac pos-ab r-10 t--41'>
        {tabs.map((tab) => {
          return (
            <div
              onClick={() => tab.path && history.push(tab.path)}
              className={`${
                tab.path === location.pathname ? "bg-white" : "bg-tab"
              } mr-20 tab cp `}
            >
              {tab.title}
            </div>
          );
        })}
      </div>
      {showDefaultSelectedFilter && (
        <div className='flex-r-ac flex-jc-sp-btn bg-secondary'>
          <div className='flex-r-ac'>
            <div className="bdr-r-25 bg-white pt-8 pb-8 pl-10 pr-10 flex-r-ac mr-10">
              <div><CtGroupIcon /></div>
              <p className='ml-5 fc-primary fw-500'>CT Group: </p>
              <div className='ml-5 mr-15 fc-quaternary fw-400 f-16 pt-5 pb-5 pr-10 pl-10 bdr-tertiary-1 bdr-r-25 flex-r-ac'>
                <div className="fc-tertiary">bds-frontend</div>
                <div className="pl-10 pr-5">
                  <BlueDropdownArrow />
                </div>
              </div>
              <div className="mr-10"><RedCloseIcon /></div>
            </div>
            <div className="bdr-r-25 bg-white pt-8 pb-8 pl-10 pr-10 flex-r-ac mr-10">
              <div><CtIcon /></div>
              <p className='ml-5 fc-primary fw-500'>Cloud Tenant: </p>
              <div className='ml-5 mr-15 fc-quaternary fw-400 f-16 pt-5 pb-5 pr-10 pl-10 bdr-tertiary-1 bdr-r-25 flex-r-ac'>
                <div className="fc-tertiary">alok-kumar</div>
                <div className="pl-10 pr-5">
                  <BlueDropdownArrow />
                </div>
              </div>
              <div className="mr-10"><RedCloseIcon /></div>
            </div>
            <div className="bdr-r-25 bg-white pt-2 pb-2 pl-10 pr-10 flex-r-ac mr-10">
              <div><AwsCloudIcon /></div>
              <p className='ml-5 fc-primary fw-500'>Account ID: </p>
              <div className='ml-5 mr-15 fc-quaternary fw-400 f-16 pt-5 pb-5 pr-10 pl-10 bdr-tertiary-1 bdr-r-25 flex-r-ac'>
                <div className="fc-tertiary">AWS2340982430732</div>
                {/* <div className="pl-10 pr-5">
                  <BlueDropdownArrow />
                </div> */}
              </div>
              {/* <div className="mr-10"><RedCloseIcon /></div> */}
            </div>
            <div className="bdr-r-25 bg-white pt-8 pb-8 pl-10 pr-10 flex-r-ac mr-10">
              <div><GlobalRegionIcon /></div>
              <p className='ml-5 fc-primary fw-500'>Region: </p>
              <div className='ml-5 mr-15 fc-quaternary fw-400 f-16 pt-5 pb-5 pr-10 pl-10 bdr-tertiary-1 bdr-r-25 flex-r-ac'>
                <div className="fc-tertiary">Global</div>
                {/* <div className="pl-10 pr-5">
                  <BlueDropdownArrow />
                </div> */}
              </div>
              {/* <div className="mr-10"><RedCloseIcon /></div> */}
            </div>
          </div>

          {!hideAdd && (
            <div
              className='lightblue-container-br-5 flex-r flex-r-ac flex-jc-sp-btn pl-24 pr-24 pb-10 pt-10 cp'
              onClick={modalOnClick}
            >
              <AddNewIcon />
              <p className='font-16 fw-600 fc-white pl-10'>Add New</p>
            </div>
          )}
        </div>
      )}
      <div className='flex-r-ac flex-jc-sp-btn mt-10'>
        <div className='flex-r wp-100 flex-r-ac flex-jc-sp-btn mr-20'>
          <FilterSearch />
        </div>
        <div className='flex-r-ac flex-jc-sp-btn'>
          <div className='mr-30'>
            <ColumnSettingsIcon />
          </div>
          <div className='mr-30'>
            <Refresh />
          </div>
          <div>
            <Download />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSettings;
