import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ResultList from "./ResultList";
import Pagination from "./Pagination";
import { useOmdbAPIGetInfo } from "../lib/useOmdbAPIGetInfo";

const BASE_URL = "https://stormy-badlands-85674.herokuapp.com/api/v1/info?";

function Search() {
  const [hiddenPagination, setHiddenPagination] = useState(true);
  const [maxPages, setMaxPages] = useState(1);
  const [idInfo, setIdInfo] = useState("");

  const queryResult = useSelector((state) => state.queryResultReducer);

  useEffect(() => {
    if (!queryResult.isResultFound) {
      setHiddenPagination(true);
    }
    if (queryResult.isResultFound) setHiddenPagination(false);
  }, [queryResult.isResultFound]);

  useEffect(() => {
    const resultsPerPage = 10;
    const numOfPages = Math.ceil(queryResult.totalResults / resultsPerPage);
    setMaxPages(numOfPages || 1);
  }, [queryResult.totalResults]);

  const [
    infoResult,
    isInfoLoading,
    isInfoError,
    setInfoQueryId,
  ] = useOmdbAPIGetInfo(BASE_URL);

  useEffect(() => {
    setInfoQueryId(idInfo);
  }, [setInfoQueryId, idInfo]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClickForInfo(id) {
    setIdInfo(id);
    setIsOpenModal(true);
  }
  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <div className="Search">
      <main className="main">
        <Pagination hidden={hiddenPagination} maxPages={maxPages} />
        <ResultList
          searchResults={queryResult.data}
          searchLoading={queryResult.isLoading}
          fetchError={queryResult.error}
          onClick={handleClickForInfo}
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

export default Search;
