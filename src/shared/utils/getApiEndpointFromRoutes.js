const weedoutArrays = (exPath) => {
  console.log(exPath);
  const finalArrayWithDetails = exPath
    .map((ar) => {
      if (Array.isArray(ar)) {
        return ar.filter((art) => art.length > 0);
      }
    })
    .filter((e) => e?.length > 0);

  if (finalArrayWithDetails.length > 0) {
    return finalArrayWithDetails;
  }

  return exPath;
};

const getExactPathArray = (routes, location, mainRoute) => {
  const mappedArrays = routes().map((e) => {
    return (
      e.items &&
      e.items.map((el) => {
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

        return e;
      })
    );
  });

  if (mappedArrays.some((e) => e)) {
    return mappedArrays;
  }

  return routes().filter(
    (e) =>
      e.path.replace(mainRoute, "") ===
      location?.pathname?.replace(mainRoute, "")
  );
};
// NOTE : Flat(3) is 3 level deep routing (...). 3 is tentative.
// it will change based on available nested routes.
export const getTableDetailFromRoutes = (routes, location, mainRoute) => {
  return weedoutArrays(getExactPathArray(routes, location, mainRoute)).flat(
    3
  )?.[0];
};
