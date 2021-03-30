//queryResultReducer actions
export const queryResultFetched = (data) => {
  return {
    type: "FETCHED_DATA",
    payload: data,
  };
};
export const queryResultFetching = () => {
  return {
    type: "FETCHING_DATA",
  };
};
export const queryResultError = (error) => {
  return {
    type: "FETCH_ERROR",
    payload: error,
  };
};
//currentPageReducer actions
export const currentPage = () => {
  return {
    type: "CURRENT_PAGE",
  };
};
export const gotoNextPage = (maxPages) => {
  return {
    type: "NEXT_PAGE",
    payload: maxPages,
  };
};
export const gotoPreviousPage = () => {
  return {
    type: "PREVIOUS_PAGE",
  };
};
export const resetToFirstPage = () => {
  return {
    type: "RESET_TO_FIRST_PAGE",
  };
};
