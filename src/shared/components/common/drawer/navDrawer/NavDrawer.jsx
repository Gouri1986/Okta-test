import React, { useState } from "react";
import { DrawerArrow } from "./assets";
import "./navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = (props) => {
  const { onClick, setActiveEndPoint, setRefresh, refresh, drawer } = props;

  const [expanded, setExpanded] = useState(false);
  const [secondMenu, showSecondMenu] = useState(false);
  const [secondMenuItems, setSecondMenuItems] = useState([]);

  return (
    <div
      className={expanded ? "drawer-container-expanded" : "drawer-container"}
    >
      {/*************** Drawer Header ****************/}
      <DrawerHeader
        secondMenu={secondMenu}
        showSecondMenu={showSecondMenu}
        setSecondMenuItems={setSecondMenuItems}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {/************** Drawer Main Section ***********/}
      <div className='flex-r'>
        <DrawerList
          expanded={expanded}
          setExpanded={setExpanded}
          setActiveEndPoint={setActiveEndPoint}
          onClick={onClick}
          refresh={refresh}
          setRefresh={setRefresh}
          drawer={drawer}
          secondMenu={secondMenu}
          showSecondMenu={showSecondMenu}
          secondMenuItems={secondMenuItems}
          setSecondMenuItems={setSecondMenuItems}
        />
        <DrawerList
          expanded={expanded}
          setExpanded={setExpanded}
          setActiveEndPoint={setActiveEndPoint}
          onClick={onClick}
          refresh={refresh}
          setRefresh={setRefresh}
          drawer={drawer}
          secondMenu={secondMenu}
          isSecondMenu
          showSecondMenu={showSecondMenu}
          secondMenuItems={secondMenuItems}
        />
      </div>
    </div>
  );
};

export default Drawer;
