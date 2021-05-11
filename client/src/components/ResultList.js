import Result from "./Result";
import ResultModal from "./ResultModal";
import PropTypes from "prop-types";

function ResultList({
  searchResults,
  searchLoading,
  fetchError,
  onClick,
  onCloseModal,
  infoResults,
  infoLoading,
  infoError,
  isOpenModal,
}) {
  return (
    <div className="results">
      {searchLoading ? (
        <p>Loading...</p>
      ) : fetchError.isError ? (
        `Something went wrong! ${fetchError.errorMsg}`
      ) : (
        searchResults.map((result) => {
          return (
            <Result
              key={result.imdbID}
              title={result.Title}
              year={result.Year}
              posterUrl={result.Poster}
              imdbID={result.imdbID}
              onClick={onClick}
            />
          );
        })
      )}
      {infoResults ? (
        <ResultModal
          key={infoResults.imdbID}
          title={infoResults.Title}
          year={infoResults.Year}
          rating={infoResults.imdbRating}
          plot={infoResults.Plot}
          actors={infoResults.Actors}
          isOpen={isOpenModal}
          onClose={onCloseModal}
          infoLoading={infoLoading}
        />
      ) : null}
    </div>
  );
}

ResultList.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default ResultList;
