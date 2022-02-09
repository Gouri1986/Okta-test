export const kebabCaseDate = (ms) => {
  const dateObj = new Date(ms * 1000);
  const date = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${date}-${month}-${year}`;
};
