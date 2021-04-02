import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetToFirstPage } from "../actions";
import SearchInput from "./SearchInput";
import SearchBtn from "./SearchBtn";
import {
  queryResultFetched,
  queryResultFetching,
  queryResultError,
  initHomePage,
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

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPageReducer);

  const [
    result,
    setQueryParams,
    isSearchLoading,
    fetchError,
    hasSearched,
    setHasSearched,
  ] = useOmdbAPISearch();

  useEffect(() => {
    setQueryParams({ url: queryUrl, page: currentPage, type: searchType });
  }, [setQueryParams, queryUrl, currentPage, searchType]);

  useEffect(() => {
    if (isSearchLoading) dispatch(queryResultFetching());
  }, [isSearchLoading, dispatch]);

  useEffect(() => {
    if (fetchError.isError) {
      dispatch(queryResultError(fetchError.errorMsg));
    }
  }, [dispatch, fetchError]);

  useEffect(() => {
    if (hasSearched && result.resultData) {
      dispatch(queryResultFetched(result));
    }
  }, [dispatch, hasSearched, result]);

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
  function handleClickLogo() {
    // setSearchValue(null);
    // setHasSearched(false);
    // dispatch(initHomePage(true));
    console.log("clicked");
  }
  return (
    <div className="Nav">
      <nav className="nav-bar">
        <Link to="/">
          <i className="fas fa-film fa-5x logo" onClick={handleClickLogo}></i>
          <i className="fas fa-film fa-2x logo-small"></i>
        </Link>
        <div className="search-wrapper">
          <TypeList
            onChangeSearchType={(e) => {
              dispatch(resetToFirstPage());
              setSearchType(e.target.value);
            }}
          />
          <div className="search-bar">
            <SearchInput
              onKeyPress={handleKeyPress}
              onTextChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchBtn onClick={() => handleClickSearch()} />
          </div>
        </div>
        <Favorites />
      </nav>
    </div>
  );
}

export default Nav;
