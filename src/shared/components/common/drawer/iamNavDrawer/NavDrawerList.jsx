import Tooltip from "@mui/material/Tooltip";
import React, { useRef, useState } from "react";
import { encsDrawer, iamDrawer } from "./utils";
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
        onClick={() => {
          navigate("/iam" + sub.path);
          setActiveEndPoint(sub.apiEndpoint);
        }}
        ref={lr}
        className={"cp font-14 fw-400 lh-21 f-white mb-10 p-12 flex-r"}
        key={sub.title}
      >
        <sub.Icon />
        {!collapsed && (
          <span className='ml-15 font-16 fw-600 lh-21 f-grey icon-name'>
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
            <span className={"fw-400 font-16 lh-21 f-darkgrey"}>
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
        )
      </div>
    </div>
  );
};

export default DrawerList;
