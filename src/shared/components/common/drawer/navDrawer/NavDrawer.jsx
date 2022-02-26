import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTableActiveEndpoint } from "../../../../../redux/table/tabelActions";
import {
  setFilterDrawerExpand,
  setComplianceDrawerExpand,
  setNavDrawerExpand,
} from "../../../../../redux/common/commonActions";
import { DrawerArrow } from "./assets";
import "./navdrawer.scss";
import DrawerHeader from "./NavDrawerHeader";
import DrawerList from "./NavDrawerList";

const Drawer = (props) => {
  const { onClick } = props;
  const dispatch = useDispatch();

  const { navExpanded } = useSelector((state) => state.commonReducer);
  const [secondMenu, showSecondMenu] = useState(false);
  const [secondMenuItems, setSecondMenuItems] = useState([]);

  useEffect(() => {
    !navExpanded && showSecondMenu(false);
  }, [navExpanded]);

  return (
    <div className={"drawer-container"}>
      {/*************** Drawer Header ****************/}
      <DrawerHeader
        secondMenu={secondMenu}
        showSecondMenu={showSecondMenu}
        setSecondMenuItems={setSecondMenuItems}
        expanded={navExpanded}
        setExpanded={(v) => {
          dispatch(setNavDrawerExpand(v));
          v &&
            dispatch(setFilterDrawerExpand(false)) &&
            dispatch(setComplianceDrawerExpand(false));
        }}
      />
      {/************** Drawer Main Section ***********/}
      <div className='flex-r'>
        <DrawerList
          expanded={navExpanded}
          setExpanded={(v) => dispatch(setNavDrawerExpand(v))}
          setActiveEndPoint={(ep) => dispatch(setTableActiveEndpoint(ep))}
          onClick={() => dispatch()}
          secondMenu={secondMenu}
          showSecondMenu={showSecondMenu}
          secondMenuItems={secondMenuItems}
          setSecondMenuItems={setSecondMenuItems}
        />
        <DrawerList
          expanded={navExpanded}
          setExpanded={(v) => dispatch(setNavDrawerExpand(v))}
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
