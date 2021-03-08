import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import SearchBtn from "./components/SearchBtn";
import ResultList from "./components/ResultList";
import Pagination from "./components/Pagination";
import TypeList from "./components/TypeList";
import { useOmdbAPISearch } from "./useOmdbAPISearch";
import { useOmdbAPIGetInfo } from "./useOmdbAPIGetInfo";

const API_KEY = "5f74b61e";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [hidden, setHidden] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryUrl, setQueryUrl] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const [idInfo, setIdInfo] = useState("");

  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;

  const [
    { data, totalResults },
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
    if (!isResult) {
      setQueryResult(nullSearchResult);
    }
    if (isResult && data) {
      setQueryResult(data.Search);
      setHidden(false);
    }
  }, [data, isResult]);

  const [
    infoResult,
    isInfoLoading,
    isInfoError,
    setInfoQueryId,
  ] = useOmdbAPIGetInfo(BASE_URL, "");
  if (isInfoLoading) console.log("Loading");

  useEffect(() => {
    setInfoQueryId(idInfo);
  }, [setInfoQueryId, idInfo]);

  function handleKeyPress(e) {
    if (e.key !== "Enter") return;
    if (!searchValue) return;
    setCurrentPage(1);
    setQueryUrl(URL);
  }
  function handleClickSearch() {
    if (!searchValue) return;
    setCurrentPage(1);
    setQueryUrl(URL);
  }
  function handleClickImage(id) {
    setIdInfo(id);
    setIsOpenModal(true);
  }
  function handleCloseModal() {
    setIsOpenModal(false);
  }
  function nullSearchResult() {
    return [
      {
        imdbID: null,
        Title: null,
        Year: null,
        Poster: null,
      },
    ];
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
          {/* <p>current page: {currentPage}</p>
        <p>page: {page}</p>
        <p>max pages: {maxPages}</p> */}
        </div>
      </nav>
      <main className="main">
        <Pagination
          hidden={hidden}
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
