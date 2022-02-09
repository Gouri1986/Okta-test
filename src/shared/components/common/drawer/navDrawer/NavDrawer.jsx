import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTableActiveEndpoint } from "../../../../../redux/table/tabelActions";
import { DrawerArrow } from "./assets";
import "./navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = (props) => {
  const { onClick } = props;
  const dispatch = useDispatch();

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
          setActiveEndPoint={(ep) => dispatch(setTableActiveEndpoint(ep))}
          onClick={() => dispatch()}
          secondMenu={secondMenu}
          showSecondMenu={showSecondMenu}
          secondMenuItems={secondMenuItems}
          setSecondMenuItems={setSecondMenuItems}
        />
        <DrawerList
          expanded={expanded}
          setExpanded={setExpanded}
          setActiveEndPoint={(ep) => dispatch(setTableActiveEndpoint(ep))}
          onClick={onClick}
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
