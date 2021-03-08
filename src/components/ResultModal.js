import React from "react";
import ReactDOM from "react-dom";
import "./ResultModal.css";

function ResultModal({
  title,
  year,
  rating,
  plot,
  actors,
  isOpen,
  onClose,
  infoLoading,
}) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="background"></div>
      <div className="modal">
        <button onClick={onClose}>
          <i className="far fa-window-close fa-2x"></i>
        </button>
        {infoLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <h3>{title}</h3>
            <p>{year}</p>
            <p>IMDb rating: {rating}</p>
            <p>{plot}</p>
            <p>Starring: {actors}</p>
          </>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default ResultModal;
