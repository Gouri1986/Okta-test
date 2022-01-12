import Tooltip from "@mui/material/Tooltip";
import React, { useRef, useState } from "react";
import { DashboardIcon, IAMIcon } from "./assets";
import { encsDrawer } from "../../../../utils/drawer";
import { useNavigate } from "react-router-dom";

const List = ({ sub, collapsed, setActiveEndPoint, setRefresh, refresh }) => {
  const lr = useRef();
  const navigate = useNavigate();
  const [hoverSubMenu, setHoverSubMenu] = useState([]);

  const [subOffset, setSubOffset] = useState({
    subTopOffset: 0,
    subLeftOffset: 0,
  });

  const listItemHover = () => {
    setSubOffset({
      subLeftOffset: lr.current.offsetLeft + 50,
      subTopOffset: lr.current.offsetTop,
    });
  };

  return (
    <Tooltip title={sub.title} placement='top-end'>
      <li
        onMouseEnter={() => {
          setHoverSubMenu(sub.items);
          collapsed && listItemHover(lr);
        }}
        onMouseLeave={() => {
          setSubOffset({ subLeftOffset: 0, subTopOffset: 0 });
        }}
        ref={lr}
        className={"cp f-14 fw-400 lh-2-1 fc-tertiary mb-10 p-12 flex-r-ac"}
        key={sub.title}
      >
        <sub.Icon />
        {!collapsed && (
          <span className='ml-15 f-16 fw-600 lh-2-1 fc-tertiary icon-name'>
            {sub.title}
          </span>
        )}
        <span>
          {collapsed && (
            <ul
              className='sub-menu-section p-10'
              style={{
                display: subOffset.subTopOffset === 0 ? "none" : "flex",
                flexDirection: "column",
                top: subOffset.subTopOffset,
                left: subOffset.subLeftOffset,
              }}
            >
              {hoverSubMenu?.map((menu) => (
                <li
                  onClick={() => {
                    navigate("/environmentcatelogue" + menu.path);
                    setSubOffset({
                      subLeftOffset: 0,
                      subTopOffset: 0,
                    });
                    setActiveEndPoint(menu.apiEndpoint);
                    setRefresh(!refresh);
                  }}
                  className='pr-15 pl-15 pt-10 pb-10 f-16 fw-600 lh-2-1 f-grey icon-name'
                >
                  {menu.title}
                </li>
              ))}
            </ul>
          )}
        </span>
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
  const navigate = useNavigate();

  return (
    <div className='drawer-list-container mt-50'>
      <ul>
        <li onClick={() => navigate("/iam")} className='cp p-12 flex-r-ac'>
          <IAMIcon />
          {!collapsed && (
            <span className='ml-20 f-16 fw-600 lh-2-1 fc-tertiary icon-name'>
              IAM
            </span>
          )}
        </li>
        <li className='cp p-12 flex-r-ac'>
          <DashboardIcon />
          {!collapsed && (
            <span className='ml-20 f-16 fw-600 lh-2-1 fc-tertiary icon-name'>
              Dashboard
            </span>
          )}
        </li>
      </ul>
      <div className='mt-20'>
        {encsDrawer().map((section) => (
          <div className='drawer-lists'>
            {!collapsed && (
              <span className={"fw-400 f-16 lh-2-1 fc-tertiary"}>
                {section.title}
              </span>
            )}
            <ul className='mt-10'>
              {section.items?.map((sub, index) => (
                <List
                  setActiveEndPoint={setActiveEndPoint}
                  sub={sub}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  index={index}
                  collapsed={collapsed}
                  onClick={onClick}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawerList;
