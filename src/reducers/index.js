import queryResultReducer from "./queryResult";
import currentPageReducer from "./currentPage";
import initHomePageReducer from "./initHomePage";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  queryResultReducer,
  currentPageReducer,
  initHomePageReducer,
});

export default allReducers;
