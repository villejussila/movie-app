import React from "react";

function TypeList({ onChangeSearchType }) {
  return (
    <div className="search-type-list">
      <select
        name="search-type"
        id="search-type-select"
        tabIndex="2"
        onChange={(e) => onChangeSearchType(e)}
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    </div>
  );
}

export default TypeList;
