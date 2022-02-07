import { iamDrawer } from "./drawer";

const weedoutArrays = (exPath) => {
  return exPath
    .map((ar) => ar.filter((art) => art.length > 0))
    .filter((e) => e.length > 0);
};

const getExactPathArray = (routes, location, mainRoute) => {
  return routes().map((e) => {
    return e.items
      ? e.items.map((el) => {
          if (el.items) {
            return el.items?.filter((it) => {
              return (
                it.path.replace(mainRoute, "") ===
                location?.pathname?.replace(mainRoute, "")
              );
            });
          }
          if (e.items) {
            return e.items?.filter(
              (it) =>
                it.path.replace(mainRoute, "") ===
                location?.pathname?.replace(mainRoute, "")
            );
          }

          return [e];
        })
      : [e];
  });
};

// NOTE : Flat(3) is 3 level deep routing (...). 3 is tentative.
// it will change based on available nested routes.

export const getApiEndpointNameFromRoutes = (routes, location, mainRoute) => {
  return weedoutArrays(getExactPathArray(routes, location, mainRoute)).flat(
    3
  )?.[0]?.apiEndpoint;
};

export const getTableTitleNameFromRoutes = (routes, location, mainRoute) => {
  return weedoutArrays(getExactPathArray(routes, location, mainRoute)).flat(
    3
  )?.[0]?.title;
};

export const getTableKeyNameFromRoutes = (routes, location, mainRoute) => {
  {
    return weedoutArrays(getExactPathArray(routes, location, mainRoute)).flat(
      3
    )?.[0]?.key;
  }
};

export const getTableDetailFromRoutes = (routes, location, mainRoute) => {
  let mappedRoute = routes.map((e) => {
    if (e.routes) {
      return Object.values(e.routes).map((v) =>
        v.find((vl) => vl.path === location.pathname.replace(mainRoute, ""))
      );
    } else {
      console.log(e);
      return e;
    }
  });
  console.log(mappedRoute);
  const returnRoute = mappedRoute.filter((e) => {
    if (Array.isArray(e)) {
      return e.filter((el) => el !== undefined).length > 0;
    }
    return [e];
  })?.[0];

  console.log(returnRoute);
  if (Array.isArray(returnRoute)) {
    return returnRoute.filter((e) => e !== undefined)[0];
  } else {
    return returnRoute;
  }
};
