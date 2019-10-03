export const setFilter = (filter) => {
  console.log(filter)
  return {
    type: "SET_FILTER",
    filter
  }
};
