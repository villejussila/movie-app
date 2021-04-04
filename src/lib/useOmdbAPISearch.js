import { useState, useEffect } from "react";
import {
  nullOmdbAPISearchResults,
  removeDuplicateResultsFromArray,
} from "./utils";

export function useOmdbAPISearch(
  initialUrl = "",
  initialPage = 1,
  initialSearchType = ""
) {
  const [result, setResult] = useState({
    resultData: null,
    totalResults: 0,
    isResultFound: false,
  });
  const [queryParams, setQueryParams] = useState({
    url: initialUrl,
    page: initialPage,
    type: initialSearchType,
  });
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setFetchError] = useState({
    isError: false,
    errorMsg: null,
  });
  const [hasSearched, setHasSearched] = useState(true);

  useEffect(() => {
    let cancelRequest = false;
    if (!queryParams.url) return;
    setIsSearchLoading(true);
    const queryUrl = `${queryParams.url}&type=${queryParams.type}&page=${queryParams.page}`;
    fetch(queryUrl)
      .then((res) => res.json())
      .then((data) => {
        if (cancelRequest) return;
        if (data.Search) {
          setResult(() => {
            return {
              resultData: removeDuplicateResultsFromArray(
                data.Search,
                "imdbID"
              ),
              totalResults: data.totalResults,
              isResultFound: true,
            };
          });
          // console.log(result);
          setIsSearchLoading(false);
          setHasSearched(true);
          setFetchError({ isError: false, errorMsg: null });
          console.log("fetched");
        } else {
          let nullData = nullOmdbAPISearchResults();
          setResult({
            resultData: nullData,
            totalResults: 0,
            isResultFound: false,
          });
          setIsSearchLoading(false);
          setHasSearched(true);
          setFetchError({ isError: false, errorMsg: null });
        }
      })
      .catch((error) => {
        if (cancelRequest) return;
        let nullData = nullOmdbAPISearchResults();
        setResult({
          resultData: nullData,
          totalResults: 0,
          isResultFound: false,
        });
        setIsSearchLoading(false);
        setHasSearched(true);
        setFetchError({ isError: true, errorMsg: error });
        console.log(error);
      });

    return () => {
      cancelRequest = true;
    };
  }, [queryParams]);

  return [
    result,
    setQueryParams,
    isSearchLoading,
    searchError,
    hasSearched,
    setHasSearched,
  ];
}
