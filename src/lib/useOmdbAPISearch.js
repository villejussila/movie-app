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
    data: null,
    totalResults: 0,
  });
  const [queryParams, setQueryParams] = useState({
    url: initialUrl,
    page: initialPage,
    type: initialSearchType,
  });
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isResult, setIsResult] = useState(true);

  useEffect(() => {
    let cancelRequest = false;
    if (!queryParams.url) return;
    setIsSearchLoading(true);
    const queryUrl = `${queryParams.url}&type=${queryParams.type}&page=${queryParams.page}`;
    fetch(queryUrl)
      .then((res) => res.json())
      .then((responseData) => {
        if (cancelRequest) return;
        if (responseData.Search) {
          setResult(() => {
            return {
              data: removeDuplicateResultsFromArray(
                responseData.Search,
                "imdbID"
              ),
              totalResults: responseData.totalResults,
            };
          });
          setIsSearchLoading(false);
          setIsResult(true);
          setIsSearchError(false);
          console.log("fetched");
        } else {
          setResult({
            data: nullOmdbAPISearchResults,
            totalResults: 0,
          });
          setIsSearchLoading(false);
          setIsResult(true);
          setIsSearchError(false);
        }
      })
      .catch((err) => {
        if (cancelRequest) return;
        setIsSearchLoading(false);
        setIsResult(false);
        setIsSearchError(true);
        console.log(err);
      });

    return () => {
      cancelRequest = true;
    };
  }, [queryParams]);

  return [result, setQueryParams, isSearchLoading, isSearchError, isResult];
}
