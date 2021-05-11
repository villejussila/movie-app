import queryResultReducer from "./queryResult";
import currentPageReducer from "./currentPage";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  queryResultReducer,
  currentPageReducer,
});

export default allReducers;
