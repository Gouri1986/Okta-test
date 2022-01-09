export const truncatedDesc = (str) => str.substr(0, 50) + "...";

// Fatcloumns to dynamically increase cloumn size with fixed value
export const fatColumns = ["control-description", "regular-control"];

/**
Function util to determine width of the column
 */
export const tableHeaderItemInlineStyle = (id) => ({
  minWidth: fatColumns.includes(id) ? 280 : 120,
});
