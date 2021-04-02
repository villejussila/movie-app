import React from "react";
import "./Result.css";

function Result({ title, year, posterUrl, imdbID, onClick }) {
  let isMovieFound = title ? true : false;
  return (
    <>
      {isMovieFound ? (
        <div className="found-result">
          <h3>
            {title} ({year})
          </h3>
          <div className="found-result-info" onClick={() => onClick(imdbID)}>
            <img src={posterUrl || null} alt={title || null} />
          </div>
        </div>
      ) : (
        <div className="result-not-found">
          <h3>No results found!</h3>
        </div>
      )}
    </>
  );
}

export default Result;
