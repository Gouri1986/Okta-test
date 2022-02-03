import { Logo, NavDoubleArrow } from "./assets";

const DrawerHeader = ({
  expanded,
  setExpanded,
  secondMenu,
  showSecondMenu,
  setSecondMenuItems,
}) => {
  return (
    <div
      className={
        expanded || secondMenu
          ? "flex-r-ac flex-jc-sp-btn mt-30"
          : "mt-30 flex-c-ac"
      }
    >
      <Logo />
      <div
        onClick={() => {
          setExpanded(!expanded);
          showSecondMenu(false);
          setSecondMenuItems("");
        }}
        className={expanded || secondMenu ? "mt-0 cp" : "cp mt-30"}
      >
        <NavDoubleArrow expanded={expanded} />
      </div>
    </div>
  );
};

export default DrawerHeader;
