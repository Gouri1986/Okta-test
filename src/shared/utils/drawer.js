import { ENCSRoutes, IAMRoutes } from "../../routes/metadataRoutes";
import { drawerSectionIcons } from "../components/common/drawer/iamNavDrawer/assets";
import { getSpacedDisplayName } from "./table";

export const iamDrawer = () => {
  return IAMRoutes.map((rt) => ({
    title: "",
    items: rt.routes.routes.map((route) => ({
      title: route.pageName,
      path: route.path,
      Icon: drawerSectionIcons.AWS,
      apiEndpoint: route.apiEndpoint,
    })),
  }));
};

export const encsDrawer = () => {
  return ENCSRoutes.map((rt) => ({
    title: rt.section,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        title: getSpacedDisplayName(
          route.path.replace(/-/g, " ").replace(/\//, "")
        ),
        path: route.path,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        expandable: true,
        key: route.pk,
      })),
    })),
  }));
};
