import React from "react";

function Pagination({ hidden, gotoPreviousPage, gotoNextPage }) {
  return (
    <div className="pagination-buttons">
      <button
        className="pagination-button"
        style={hidden ? { display: "none" } : { display: "inline" }}
        onClick={gotoPreviousPage}
      >
        <i className="fas fa-arrow-left fa-2x" value="previous"></i>
      </button>
      <button
        className="pagination-button"
        style={hidden ? { display: "none" } : { display: "inline" }}
        onClick={gotoNextPage}
      >
        <i className="fas fa-arrow-right fa-2x" value="next"></i>
      </button>
    </div>
  );
}

export default Pagination;
