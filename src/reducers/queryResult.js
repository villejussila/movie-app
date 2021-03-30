const initialState = {
  data: [],
  totalResults: 0,
  isResultFound: false,
  isLoading: false,
  isError: false,
};

const queryResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_DATA":
      return {
        ...initialState,
        data: action.payload.resultData || [],
        totalResults: action.payload.totalResults,
        isResultFound: action.payload.isResultFound,
        isLoading: false,
        isError: false,
      };
    case "FETCHING_DATA":
      return {
        ...initialState,
        isLoading: true,
      };
    case "FETCH_ERROR":
      return {
        ...initialState,
        isLoading: false,
        isResultFound: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default queryResultReducer;
