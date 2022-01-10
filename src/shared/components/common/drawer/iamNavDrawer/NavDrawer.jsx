import React, { useState } from "react";
import { DrawerArrow } from "./assets";
import "../navDrawer/navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = ({ onClick, setActiveEndPoint, setRefresh, refresh }) => {
  const [collapsed, isCollapsed] = useState(true);

  return (
    <div
      className={collapsed ? "drawer-container-collapsed" : "drawer-container"}
    >
      {/*************** Drawer Header ****************/}
      <DrawerHeader collapsed={collapsed} />
      {/************** Drawer Main Section ***********/}
      <DrawerList
        setActiveEndPoint={setActiveEndPoint}
        onClick={onClick}
        refresh={refresh}
        setRefresh={setRefresh}
        collapsed={collapsed}
      />
      {/************** Drawer Arrow Icon *************/}
      <div
        onClick={() => isCollapsed(!collapsed)}
        className={"drawer-arrow-button"}
      >
        <DrawerArrow right={collapsed} />
      </div>
    </div>
  );
};

export default Drawer;
