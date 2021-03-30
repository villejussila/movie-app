import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import SearchBtn from "./components/SearchBtn";
import ResultList from "./components/ResultList";
import Pagination from "./components/Pagination";
import TypeList from "./components/TypeList";
import FavoriteList from "./components/FavoriteList";
import { useOmdbAPISearch } from "./lib/useOmdbAPISearch";
import { useOmdbAPIGetInfo } from "./lib/useOmdbAPIGetInfo";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [hiddenPagination, setHiddenPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryUrl, setQueryUrl] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const [idInfo, setIdInfo] = useState("");

  const SEARCH_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;

  const [
    { resultData, totalResults },
    setQueryParams,
    isSearchLoading,
    isSearchError,
    isResult,
  ] = useOmdbAPISearch();

  useEffect(() => {
    setQueryParams({ url: queryUrl, page: currentPage, type: searchType });
  }, [setQueryParams, queryUrl, currentPage, searchType]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const resultsPerPage = 10;
    const numOfPages = Math.ceil(totalResults / resultsPerPage);
    setMaxPages(numOfPages || 1);
  }, [totalResults]);

  useEffect(() => {
    if (isResult && resultData) {
      setQueryResult(resultData);
      setHiddenPagination(false);
    }
  }, [resultData, isResult]);

  const [
    infoResult,
    isInfoLoading,
    isInfoError,
    setInfoQueryId,
  ] = useOmdbAPIGetInfo(BASE_URL);

  useEffect(() => {
    setInfoQueryId(idInfo);
  }, [setInfoQueryId, idInfo]);

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;
    if (!searchValue) return;
    setCurrentPage(1);
    setQueryUrl(SEARCH_URL);
  }
  function handleClickSearch() {
    if (!searchValue) return;
    setCurrentPage(1);
    setQueryUrl(SEARCH_URL);
  }
  function handleClickImage(id) {
    setIdInfo(id);
    setIsOpenModal(true);
  }
  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <div className="App">
      <nav className="nav-bar">
        <div className="search-wrapper">
          <TypeList
            onChangeSearchType={(e) => {
              setCurrentPage(1);
              setSearchType(e.target.value);
            }}
          />
          <SearchInput
            onKeyPress={handleKeyPress}
            onTextChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchBtn onClick={() => handleClickSearch()} />
        </div>
        <FavoriteList />
      </nav>
      <main className="main">
        <Pagination
          hidden={hiddenPagination}
          currentPage={currentPage}
          maxPages={maxPages}
          gotoNextPage={() =>
            setCurrentPage((curr) => (curr < maxPages ? curr + 1 : curr))
          }
          gotoPreviousPage={() =>
            setCurrentPage((curr) => (curr > 1 ? curr - 1 : curr))
          }
        />
        <ResultList
          searchResults={queryResult}
          searchLoading={isSearchLoading}
          searchError={isSearchError}
          onClick={handleClickImage}
          infoResults={infoResult}
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
          infoLoading={isInfoLoading}
          infoError={isInfoError}
        />
      </main>
    </div>
  );
}

export default App;
