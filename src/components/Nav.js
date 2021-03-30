import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToFirstPage } from "../actions";
import SearchInput from "./SearchInput";
import SearchBtn from "./SearchBtn";
import {
  queryResultFetched,
  queryResultFetching,
  queryResultError,
} from "../actions";
import TypeList from "./TypeList";
import Favorites from "./Favorites";
import { useOmdbAPISearch } from "../lib/useOmdbAPISearch";

const API_KEY = process.env.REACT_APP_API_KEY;

function Nav() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [queryUrl, setQueryUrl] = useState("");

  const SEARCH_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;

  const [
    result,
    setQueryParams,
    isSearchLoading,
    isSearchError,
    hasSearched,
  ] = useOmdbAPISearch();

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPageReducer);

  useEffect(() => {
    setQueryParams({ url: queryUrl, page: currentPage, type: searchType });
  }, [setQueryParams, queryUrl, currentPage, searchType]);

  useEffect(() => {
    if (isSearchLoading) {
      dispatch(queryResultFetching());
    }
    if (hasSearched && result.resultData) {
      dispatch(queryResultFetched(result));
    }
  }, [result, hasSearched, dispatch, isSearchLoading]);

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;
    if (!searchValue) return;
    dispatch(resetToFirstPage());
    setQueryUrl(SEARCH_URL);
  }
  function handleClickSearch() {
    if (!searchValue) return;
    dispatch(resetToFirstPage());
    setQueryUrl(SEARCH_URL);
  }

  return (
    <div className="Nav">
      <nav className="nav-bar">
        <div className="search-wrapper">
          <TypeList
            onChangeSearchType={(e) => {
              dispatch(resetToFirstPage());
              setSearchType(e.target.value);
            }}
          />
          <SearchInput
            onKeyPress={handleKeyPress}
            onTextChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchBtn onClick={() => handleClickSearch()} />
        </div>
        <Favorites />
      </nav>
    </div>
  );
}

export default Nav;
