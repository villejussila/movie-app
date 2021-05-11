import { useState, useEffect } from "react";

export function useOmdbAPIGetInfo(initialUrl) {
  const [InfoResult, setInfoResult] = useState();
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [isInfoError, setIsInfoError] = useState(false);
  const BASE_URL = initialUrl;
  const [infoQueryId, setInfoQueryId] = useState("");
  useEffect(() => {
    if (!infoQueryId) return;
    setIsInfoLoading(true);
    const queryUrl = BASE_URL + "&i=" + infoQueryId;
    fetch(queryUrl)
      .then((res) => res.json())
      .then((data) => {
        setInfoResult(data);
        setIsInfoLoading(false);
        setIsInfoError(false);
        // console.log("fetched info");
      })
      .catch((err) => {
        setIsInfoError(true);
        setIsInfoLoading(false);
        console.log(err);
      });
  }, [infoQueryId, BASE_URL]);

  return [InfoResult, isInfoLoading, isInfoError, setInfoQueryId];
}
