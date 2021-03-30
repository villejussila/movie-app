import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gotoNextPage, gotoPreviousPage } from "../actions";

function Pagination({ hidden, maxPages }) {
  const [scrollPos, setScrollPos] = useState(0);
  window.addEventListener("scroll", () => {
    setScrollPos(window.pageYOffset);
  });

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPageReducer);

  function handleGoToPreviousPage() {
    dispatch(gotoPreviousPage());
  }
  function handleGoToNextPage(maxPages) {
    dispatch(gotoNextPage(maxPages));
  }
  return (
    <div className={scrollPos > 50 ? "pagination blur" : "pagination"}>
      <div className="pagination-buttons">
        <button
          className="pagination-button"
          style={hidden ? { display: "none" } : { display: "inline" }}
          onClick={() => handleGoToPreviousPage()}
        >
          <i className="fas fa-arrow-left fa-2x" value="previous"></i>
        </button>
        <button
          className="pagination-button"
          style={hidden ? { display: "none" } : { display: "inline" }}
          onClick={() => handleGoToNextPage(maxPages)}
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
