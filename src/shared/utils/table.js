export const getSpacedDisplayName = (s) =>
  s.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });

export const getSanitisedTableData = (tableContents, tableDataDetails) => {
  return tableContents.header?.map((e) => {
    const pk = tableDataDetails.pk?.includes(e.id);
    const uk = tableDataDetails.uk?.includes(e.id);
    const dropdown = tableDataDetails.dropdown?.find(
      (el) => el.name === e.id.trim()
    );
    const checkbox = tableDataDetails.checkbox?.find(
      (el) => el.name === e.id.trim()
    );
    const visibilitydependency = tableDataDetails.visibilitydependency?.find(
      (el) => el.children?.includes(e.id.trim())
    );
    const nestedArrayKey = tableDataDetails.dropdown?.find(
      (el) => el.nestedArrayKey
    )?.nestedArrayKey;
    const nestedArrayDependencyKey = tableDataDetails.dropdown?.find(
      (el) => el.nestedArrayDependencyKey
    )?.nestedArrayDependencyKey;
    const json = tableDataDetails.json?.find((el) => el.name === e.id.trim());
    return {
      ...e,
      pk,
      uk,
      dropdown,
      checkbox,
      json,
      visibilitydependency,
      nestedArrayKey,
      nestedArrayDependencyKey,
    };
  });
};
