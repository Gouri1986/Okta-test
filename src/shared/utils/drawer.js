import complianceDashboardRoutes from "../../routes/featureRoutes/complianceDashboard";
import { ENCSRoutes, IAMRoutes } from "../../routes/metadataRoutes";
import scosRoutes from "../../routes/metadataRoutes/securityCompliance";
import {
  ComplianceDashboardIcon,
  drawerSectionIcons,
} from "../components/common/drawer/navDrawer/assets";
import {
  DTCSIcon,
  ENCSIcon,
  RECSIcon,
  SCOSIcon,
} from "../components/common/drawer/navDrawer/assets";
import { getSpacedDisplayName } from "./table";

export const iamDrawer = () => {
  return IAMRoutes.map((rt) => ({
    ...rt,
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
    ...rt,
    title: rt.section,
    Icon: drawerSectionIcons.DTSC,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        ...route,
        title:
          route.name ||
          getSpacedDisplayName(route.path.replace(/-/g, " ").replace(/\//, "")),
        path: "/environment-catalogue" + route.path,
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
    ...rt,
    title: rt.section,
    Icon: drawerSectionIcons.DTSC,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        ...route,
        title:
          route.name ||
          getSpacedDisplayName(route.path.replace(/-/g, " ").replace(/\//, "")),
        path: `/security-compliance${route.path}`,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        showAsSubMenu: route.showAsSubMenu,
        key: route.pk,
      })),
    })),
  }));
};

export const complianceDashboardDrawer = () => {
  return complianceDashboardRoutes.map((rt) => ({
    ...rt,
    title: rt.section,
    Icon: drawerSectionIcons.DTSC,
    path: "/compliance-dashboard" + rt.path,
    apiEndpoint: rt.apiEndpoint,
    pk: rt.pk,
    items:
      rt.routes &&
      Object.keys(rt.routes).map((key) => ({
        title: getSpacedDisplayName(key),
        Icon: drawerSectionIcons.GCP,
        items: rt.routes[key].map((route) => ({
          ...route,
          title:
            route.name ||
            getSpacedDisplayName(
              route.path.replace(/-/g, " ").replace(/\//, "")
            ),
          path: "/compliance-dashboard" + route.path,
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
  {
    title: "Cloud Governance",
    items: [
      {
        title: "Compliance Dashboard",
        Icon: ComplianceDashboardIcon,
        drawer: complianceDashboardDrawer,
      },
    ],
  },
];
