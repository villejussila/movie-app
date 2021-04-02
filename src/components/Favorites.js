import React from "react";
import { Link } from "react-router-dom";

function Favorites() {
  return (
    <div className="favorites">
      <Link to="favorites">
        <p>Favorites</p>
      </Link>
    </div>
  );
}

export default Favorites;
