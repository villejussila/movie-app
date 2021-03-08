import React from "react";

function SearchInput({ onKeyPress, onTextChange }) {
  return (
    <>
      <input
        type="search"
        name="search-input"
        id="search-input"
        className="search-element"
        onKeyPress={(e) => onKeyPress(e)}
        onChange={onTextChange}
      />
    </>
  );
}

export default SearchInput;
