import { ENCSRoutes } from "../../routes/metadataRoutes";
import { getSpacedDisplayName } from "./table";

export const encsDrawer = () => {
  return ENCSRoutes.map((rt) => ({
    title: rt.section,
    items: Object.keys(rt.routes).map((key) => ({
      title: getSpacedDisplayName(key),
      items: rt.routes[key].map((route) => ({
        title: getSpacedDisplayName(
          route.path.replace(/-/g, " ").replace(/\//, "")
        ),
        path: route.path,
        id: route.path,
        apiEndpoint: route.apiEndpoint,
        expandable: true,
      })),
    })),
  }));
};
