import { ENCSRoutes, IAMRoutes } from "../../routes/metadataRoutes";
import scosRoutes from "../../routes/metadataRoutes/securityCompliance";
import { drawerSectionIcons } from "../components/common/drawer/navDrawer/assets";
import {
  DTCSIcon,
  ENCSIcon,
  RECSIcon,
  SCOSIcon,
} from "../components/common/drawer/navDrawer/assets";
import { getSpacedDisplayName } from "./table";

export const iamDrawer = () => {
  return IAMRoutes.map((rt) => ({
    title: "IAM",
    Icon: drawerSectionIcons.DTSC,
    items: rt.routes.routes.map((route) => ({
      title: route.pageName,
      path: "/iam" + route.path,
      Icon: drawerSectionIcons.AWS,
      apiEndpoint: route.apiEndpoint,
    })),
  }));
};

export const encsDrawer = () => {
  return ENCSRoutes.map((rt) => ({
    title: rt.section,
    Icon: drawerSectionIcons.DTSC,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        title:
          route.name ||
          getSpacedDisplayName(route.path.replace(/-/g, " ").replace(/\//, "")),
        path: "/environmentcatelogue" + route.path,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        expandable: true,
        key: route.pk,
      })),
    })),
  }));
};

export const scosDrawer = () => {
  return scosRoutes.map((rt) => ({
    title: rt.section,
    Icon: drawerSectionIcons.DTSC,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        title:
          route.name ||
          getSpacedDisplayName(route.path.replace(/-/g, " ").replace(/\//, "")),
        path: "/securitycompliance" + route.path,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        showAsSubMenu: route.showAsSubMenu,
        key: route.pk,
      })),
    })),
  }));
};

export const mainDrawer = [
  {
    title: "Admin Tools",
    items: [
      { title: "IAM", Icon: DTCSIcon, drawer: iamDrawer },
      { title: "Security Compliance", Icon: SCOSIcon, drawer: scosDrawer },
      { title: "Environment Catalogue ", Icon: ENCSIcon, drawer: encsDrawer },
      { title: "Resource Inventory Catalogue", Icon: RECSIcon },
      { title: "Data Tech Catalogue", Icon: DTCSIcon },
    ],
  },
];
