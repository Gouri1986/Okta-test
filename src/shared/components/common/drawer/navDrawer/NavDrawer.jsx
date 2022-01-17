import React, { useState } from "react";
import { DrawerArrow } from "./assets";
import "./navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = ({ onClick, setActiveEndPoint, setRefresh, refresh }) => {
  // const [collapsed, isCollapsed] = useState(true);

  return (
    <div className={"drawer-container"}>
      {/*************** Drawer Header ****************/}
      <DrawerHeader />
      {/************** Drawer Main Section ***********/}
      <DrawerList
        setActiveEndPoint={setActiveEndPoint}
        onClick={onClick}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Drawer;
