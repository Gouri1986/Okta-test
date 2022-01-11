export const getSpacedDisplayName = (s) =>
  s.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
