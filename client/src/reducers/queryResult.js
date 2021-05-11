const initialState = {
  data: [],
  totalResults: 0,
  isResultFound: false,
  isLoading: false,
  error: { isError: false, errorMsg: null },
};

const queryResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_DATA":
      return {
        data: action.payload.resultData || [],
        totalResults: action.payload.totalResults,
        isResultFound: action.payload.isResultFound,
        isLoading: false,
        error: { irError: false, errorMsg: null },
      };
    case "FETCHING_DATA":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isResultFound: false,
        error: { isError: true, errorMsg: action.payload },
      };
    default:
      return state;
  }
};

export default queryResultReducer;
