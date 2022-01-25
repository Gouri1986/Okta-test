import React, { useState } from "react";
import { DrawerArrow } from "./assets";
import "./navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = (props) => {
  const { onClick, setActiveEndPoint, setRefresh, refresh, drawer } = props;

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
        drawer={drawer}
      />
    </div>
  );
};

export default Drawer;
