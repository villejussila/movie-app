import React from "react";
import "./Result.css";

function Result({ title, year, posterUrl, imdbID, onClick }) {
  let isMovieFound = title ? true : false;
  return (
    <>
      {isMovieFound ? (
        <div className="found-result" onClick={() => onClick(imdbID)}>
          <h3>
            {title} ({year})
          </h3>
          <div className="found-result-info">
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
