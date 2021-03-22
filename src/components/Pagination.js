import { useState } from "react";

function Pagination({
  hidden,
  currentPage,
  maxPages,
  gotoPreviousPage,
  gotoNextPage,
}) {
  const [scrollPos, setScrollPos] = useState(0);
  window.addEventListener("scroll", () => {
    setScrollPos(window.pageYOffset);
  });

  return (
    <div className={scrollPos > 50 ? "pagination blur" : "pagination"}>
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
      <div className="page-number">
        <p style={hidden ? { display: "none" } : { display: "flex" }}>
          {currentPage} / {maxPages}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
