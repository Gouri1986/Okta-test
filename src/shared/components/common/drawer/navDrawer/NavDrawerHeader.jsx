import { Logo } from "./assets";

const DrawerHeader = ({ collapsed }) => {
  return (
    <div className="mt-30">
      <Logo collapsed={collapsed} />
    </div>
  );
};

export default DrawerHeader;
