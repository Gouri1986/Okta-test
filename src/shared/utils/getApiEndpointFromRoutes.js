const weedoutArrays = (exPath) => {
  return exPath
    .map((ar) => ar.filter((art) => art.length > 0))
    .filter((e) => e.length > 0);
};

const getExactPathArray = (routes, location, mainRoute) =>
  routes().map((e) =>
    e.items?.map((el) =>
      el.items?.filter(
        (it) => it.path === location?.pathname?.replace(mainRoute, "")
      )
    )
  );

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
