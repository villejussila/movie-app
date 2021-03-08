import React from "react";

function SearchBtn({ onClick }) {
  return (
    <>
      <button onClick={onClick} id="search-button" className="search-element">
        <i className="fas fa-search" ></i>
      </button>
    </>
  );
}

export default SearchBtn;
