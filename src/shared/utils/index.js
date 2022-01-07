const weedoutArrays = (exPath) => {
  return exPath
    .map((ar) => ar.filter((art) => art.length > 0))
    .filter((e) => e.length > 0);
};

const getExactPathArray = (routes, location) =>
  routes().map((e) =>
    e.items?.map((el) =>
      el.items?.filter(
        (it) => it.path === location?.pathname?.replace("encs/", "")
      )
    )
  );

// NOTE : Flat(3) is 3 level deep routing (...). 3 is tentative.
// it will change based on available nested routes.

export const getApiEndpointNameFromRoutes = (routes, location) => {
  return weedoutArrays(getExactPathArray(routes, location)).flat(3)?.[0]
    ?.apiEndpoint;
};
