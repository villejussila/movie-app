import React from "react";

function SearchInput({ onKeyPress, onTextChange }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search movies and TV-shows"
        tabIndex="0"
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
