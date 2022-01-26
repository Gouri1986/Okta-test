import Tooltip from "@mui/material/Tooltip";
import React, { useRef, useState } from "react";
import { DashboardIcon, IAMIcon } from "./assets";
import { useNavigate } from "react-router-dom";

const List = (props) => {
  const { item, setActiveEndPoint, setRefresh, refresh } = props;
  const { title = "", items = [], Icon, path = "", apiEndpoint = "" } = item;

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
    <Tooltip title={title} placement='top-end'>
      <li
        onMouseEnter={() => {
          setHoverSubMenu(items);
          listItemHover(lr);
        }}
        onMouseLeave={() => {
          setSubOffset({ subLeftOffset: 0, subTopOffset: 0 });
        }}
        onClick={() => {
          if (path.length > 0) {
            navigate("/iam" + path);
            setActiveEndPoint(apiEndpoint);
            setRefresh(!refresh);
          }
        }}
        ref={lr}
        className={"cp f-14 fw-400 lh-2-1 fc-tertiary mb-10 p-12 flex-r-ac"}
        key={title}
      >
        <Icon />

        {items.length > 0 && (
          <ul
            className='sub-menu-section p-10 z-2000'
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
      </li>
    </Tooltip>
  );
};

const DrawerList = (props) => {
  const { onClick, setActiveEndPoint, setRefresh, refresh, drawer } = props;

  return (
    <div className='drawer-list-container mt-50'>
      <ul>
        <li className='cp p-12 flex-r-ac'>
          <DashboardIcon />
        </li>
      </ul>

      {/* Side navigation routes list */}
      <div className='mt-20'>
        {drawer().map((section) => (
          <div className='drawer-lists'>
            <ul className='mt-10'>
              {section.items?.map((item, index) => (
                <List
                  setActiveEndPoint={setActiveEndPoint}
                  item={item}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  index={index}
                  onClick={onClick}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Side navigation routes list */}
    </div>
  );
};

export default DrawerList;
