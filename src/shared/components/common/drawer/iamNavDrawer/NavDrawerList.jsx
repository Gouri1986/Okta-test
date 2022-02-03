import Tooltip from "@mui/material/Tooltip";
import React, { useRef } from "react";
import { iamDrawer } from "./utils";
import { useHistory } from "react-router-dom";

const List = ({ sub, collapsed, setActiveEndPoint, setRefresh, refresh }) => {
  const lr = useRef();
  const history = useHistory();

  return (
    <Tooltip title={sub.title} placement='top-end'>
      <li
        onClick={() => {
          history.push("/iam" + sub.path);
          setActiveEndPoint(sub.apiEndpoint);
        }}
        ref={lr}
        className={"cp f-14 fw-400 lh-2-1 fc-white mb-10 p-12 flex-r-ac"}
        key={sub.title}
      >
        <sub.Icon />
        {!collapsed && (
          <span className='ml-15 f-16 fw-600 lh-2-1 fc-white icon-name'>
            {sub.title}
          </span>
        )}
      </li>
    </Tooltip>
  );
};

const DrawerList = ({
  collapsed,
  onClick,
  setActiveEndPoint,
  setRefresh,
  refresh,
}) => {
  return (
    <div className='drawer-list-container mt-100'>
      <div className='mt-20'>
        <div className='drawer-lists'>
          {!collapsed && (
            <span className={"fw-400 f-16 lh-2-1 fc-white"}>
              {iamDrawer().title}
            </span>
          )}
          <ul className='mt-10'>
            {iamDrawer().item.map((section, index) => (
              <List
                setActiveEndPoint={setActiveEndPoint}
                sub={section}
                setRefresh={setRefresh}
                refresh={refresh}
                index={index}
                collapsed={collapsed}
                onClick={onClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
