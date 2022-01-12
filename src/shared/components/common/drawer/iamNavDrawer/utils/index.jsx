import { ENCSRoutes, IAMRoutes } from "../../../../../../routes/metadataRoutes";
import { drawerSectionIcons } from "../assets";

const spacedWords = (s) =>
  s.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });

export const iamDrawer = () => {
  return {
    title: "",
    item: IAMRoutes.map((route) => ({
      title: route.pageName,
      path: route.path,
      Icon: drawerSectionIcons.AWS,
      apiEndpoint: route.apiEndpoint,
    })),
  };
};

export const encsDrawer = () => {
  return ENCSRoutes.map((rt) => ({
    title: rt.section,
    items: Object.keys(rt.routes).map((key) => ({
      title: spacedWords(key),
      Icon: drawerSectionIcons.GCP,
      items: rt.routes[key].map((route) => ({
        title: spacedWords(route.path.replace(/-/g, " ").replace(/\//, "")),
        path: route.path,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        expandable: true,
        Icon: drawerSectionIcons.GCP,
      })),
    })),
  }));
};
