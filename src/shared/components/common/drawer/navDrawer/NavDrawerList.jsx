// React imports
import React, { useEffect, useState } from "react";

// Tooltip Imports from MUI
import Tooltip from "@mui/material/Tooltip";

// Router Imports
import { useHistory, useLocation } from "react-router-dom";

// Main Drawer from the drawer utility file
import { mainDrawer } from "../../../../utils/drawer";

// SVG Icons from the assets
import { NavBarMenuArrow } from "./assets";
import { useDispatch } from "react-redux";
import { setActiveTableTabs } from "../../../../../redux/table/tabelActions";

const DrawerList = (props) => {
  // Properties passed from the parent Drawer component
  const {
    onClick,
    setActiveEndPoint,
    expanded,
    secondMenu,
    showSecondMenu,
    secondMenuItems,
    setSecondMenuItems,
    setExpanded,
    isSecondMenu,
  } = props;

  /**
   * Following state is to manage the selected mode of 1ST LEVEL MENU
   * Which is an object and will have title of selected menu and state of selection
   */

  const [menuExpanded, setMenuExpanded] = useState({
    title: "",
    bool: false,
  });

  /**
   * Following state is to manage the selected mode of 2ND LEVEL EMNU
   * Which is an object and will have title of selected menu and state of selection
   */

  const [subMenuExpanded, setSubMenuExpanded] = useState({
    title: "",
    bool: false,
  });

  useEffect(() => {
    /**
     * on expand and collapse reset the sleection of menu
     */
    setSubMenuExpanded({
      title: "",
      bool: false,
    });
    setMenuExpanded({
      title: "",
      bool: false,
    });

    // "expanded" as the dpendency array
  }, [expanded]);

  /**
   *
   * 1st Level List Component
   *
   */

  const List = (props) => {
    const { item, expanded } = props;
    const { title = "", drawer = () => {}, Icon } = item;

    const SubMenuList = ({ Icon, title, items, path, apiEndpoint }) => {
      const history = useHistory();
      const dispatch = useDispatch();

      const onSubMenuClick = () => {
        if (secondMenu) {
          showSecondMenu(false);
          setSubMenuExpanded(
            subMenuExpanded.bool && subMenuExpanded.title === title
              ? { title, bool: !subMenuExpanded.bool }
              : { title, bool: true }
          );
        } else {
          if (expanded) {
            setSubMenuExpanded(
              subMenuExpanded.bool && subMenuExpanded.title === title
                ? { title, bool: true }
                : { title, bool: true }
            );
            showSecondMenu(true);
            setSecondMenuItems(items);
          }
        }
      };

      const classNameOfSubMenu = `cp flex-r-ac flex-jc-sp-btn 
      ${
        subMenuExpanded.bool && subMenuExpanded.title === title
          ? "sub-drawer-list-title-selected"
          : "sub-drawer-list-title"
      }   
      
      ${
        expanded && !secondMenu
          ? "ml-10  pl-15 pt-15 pb-15 pr-10 bdr-r-10"
          : "ml-0 pl-15 pt-10 pb-10 pr-10 bdr-r-4"
      }`;

      return (
        <div
          title={title}
          onClick={() => {
            showSecondMenu(false);
            if (path) {
              console.log(path);
              dispatch(setActiveTableTabs([]));

              history.push(path);
              setActiveEndPoint(apiEndpoint);
            } else {
              onSubMenuClick();
            }
          }}
          className={classNameOfSubMenu}
        >
          <div className='flex-r-ac flex-1'>
            <Icon />
            {expanded && !secondMenu && <span className='ml-10'>{title}</span>}
          </div>

          {expanded && !secondMenu && <NavBarMenuArrow />}
        </div>
      );
    };

    const onMenuClick = () => {
      if (expanded) {
        setMenuExpanded(
          menuExpanded.bool && menuExpanded.title === title
            ? { title, bool: !menuExpanded.bool }
            : { title, bool: true }
        );
      } else {
        setExpanded(true);
      }
    };

    const classNameOfMenu = `flex-r-ac flex-jc-sp-btn cp f-14 fw-400 lh-2-1 fc-white flex-r-ac pl-15 pr-15 pt-10 pb-10 
    ${
      menuExpanded.bool && menuExpanded.title === title
        ? "main-route-list-title-selected"
        : "main-route-list-title"
    }`;

    return (
      <Tooltip title={expanded && !secondMenu ? "" : title} placement='right'>
        <li
          className={`  flex-c ${expanded && !secondMenu ? "mb-15" : "mb-25"} `}
          key={title}
        >
          <div onClick={onMenuClick} className={classNameOfMenu}>
            <div className='flex-r-ac flex-1'>
              <Icon />
              {expanded && !secondMenu && (
                <span className='ml-10 mr-25 f-15'>{title}</span>
              )}
            </div>
            {expanded && !secondMenu && (
              <NavBarMenuArrow
                menuExpanded={menuExpanded.bool && menuExpanded.title === title}
              />
            )}
          </div>

          {menuExpanded.bool && menuExpanded.title === title && drawer() && (
            <div
              className={`pt-5 pb-5 sub-drawer-list-container ${
                expanded && !secondMenu ? "p-10" : "p-0"
              }`}
            >
              {drawer()?.map(({ Icon, title, items, path, apiEndpoint }) => (
                <SubMenuList
                  Icon={Icon}
                  title={title}
                  items={items}
                  path={path}
                  apiEndpoint={apiEndpoint}
                />
              ))}
            </div>
          )}
        </li>
      </Tooltip>
    );
  };

  const SecondNavMenu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const [secondMenuItemSelected, setSecondMenuItemSelected] = useState({
      title: "",
      bool: false,
    });

    const [secondSubMenuSelected, setSecondSubMenuSelected] = useState({
      title: "",
      bool: false,
    });

    const SecondMenuSubList = ({ item, items }) => {
      return (
        <div
          onClick={() => {
            setSecondSubMenuSelected(
              secondSubMenuSelected.bool &&
                secondSubMenuSelected.title === item.title
                ? { title: item.title, bool: !secondSubMenuSelected.bool }
                : { title: item.title, bool: true }
            );

            if (item.path.length > 0) {
              dispatch(setActiveTableTabs(items));
              history.push(item.path);
              setActiveEndPoint(item.apiEndpoint);
            }
          }}
          className={` cp flex-r-ac flex-jc-sp-btn ${
            item.path === location.pathname
              ? "second-sub-drawer-list-title-selected"
              : "second-sub-drawer-list-title"
          }   ${"ml-25  pl-15 pt-20 pb-15 pr-10"}`}
        >
          <div className='flex-r-ac flex-1'>
            {expanded && (
              <div className='ml-10'>
                <span>{item.title}</span>
              </div>
            )}
          </div>
        </div>
      );
    };

    const onSecondMenuClick = (item) => {
      if (
        Array.isArray(item.items) &&
        item.items.length === 1 &&
        !item.items[0].showAsSubMenu
      ) {
        dispatch(setActiveTableTabs([]));
        history.push(item.items[0].path);
        setActiveEndPoint(item.items[0].apiEndpoint);
        setSecondMenuItemSelected({ title: "", bool: false });
      } else if (
        Array.isArray(item.items) &&
        item.items.length === 1 &&
        item.items[0].showAsSubMenu
      ) {
        if (!item.path) {
          setSecondMenuItemSelected(
            secondMenuItemSelected.bool &&
              secondMenuItemSelected.title === item.title
              ? {
                  title: item.title,
                  bool: !secondMenuItemSelected.bool,
                }
              : { title: item.title, bool: true }
          );
        }
      } else if (Array.isArray(item.items) && item.items.length > 1) {
        if (!item.path) {
          setSecondMenuItemSelected(
            secondMenuItemSelected.bool &&
              secondMenuItemSelected.title === item.title
              ? {
                  title: item.title,
                  bool: !secondMenuItemSelected.bool,
                }
              : { title: item.title, bool: true }
          );
        }
      } else {
        dispatch(setActiveTableTabs([]));
        history.push(item.path);
        setActiveEndPoint(item.apiEndpoint);
      }
    };

    return (
      expanded &&
      secondMenu && (
        <div className='second-menu-drawer-list-container mt-30 ml-25'>
          <div className='mt-20'>
            <div className='drawer-lists'>
              <ul className='mt-10 '>
                {secondMenuItems.map((item) => (
                  <li className='flex-c mb-10'>
                    <div
                      onClick={() => {
                        onSecondMenuClick(item);
                      }}
                      className={`flex-r-ac flex-jc-sp-btn cp f-14 fw-400 lh-2-1 fc-white  flex-r-ac pl-15 pr-15 pt-10 pb-10 ${
                        item.items?.[0]?.path == location.pathname
                          ? "second-menu-route-list-title-selected"
                          : "second-menu-route-list-title"
                      }`}
                    >
                      <div className='flex-r-ac flex-1'>
                        {expanded && (
                          <span className='ml-10 mr-35 f-16'>{item.title}</span>
                        )}
                      </div>

                      {expanded && (
                        <NavBarMenuArrow
                          menuExpanded={
                            secondMenuItemSelected.bool &&
                            secondMenuItemSelected.title === item.title
                          }
                        />
                      )}
                    </div>

                    {secondMenuItemSelected.bool &&
                      secondMenuItemSelected.title === item.title &&
                      item.items && (
                        <div
                          className={`second-sub-drawer-list-container ${
                            expanded && !secondMenu ? "p-10" : "p-0"
                          }`}
                        >
                          {Array.isArray(item.items) &&
                            item.items?.map((listItem) => (
                              <SecondMenuSubList
                                item={listItem}
                                items={item.items}
                              />
                            ))}
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    );
  };

  return isSecondMenu ? (
    <SecondNavMenu />
  ) : (
    <div className='drawer-list-container mt-30'>
      <div className='mt-20'>
        {mainDrawer.map((section) => (
          <div className='drawer-lists'>
            {expanded && !secondMenu ? (
              <span className='nav-section-title'>{section.title}</span>
            ) : (
              <span
                className='nav-section-title h-1 wp-100 mb-30'
                style={{ backgroundColor: "rgba(255, 255, 255, 0.54)" }}
              />
            )}
            <ul className='mt-10'>
              {section.items?.map((item, index) => (
                <List
                  setActiveEndPoint={setActiveEndPoint}
                  item={item}
                  index={index}
                  onClick={onClick}
                  expanded={expanded}
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
