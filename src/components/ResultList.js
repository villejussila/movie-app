import Result from "./Result";
import ResultModal from "./ResultModal";
import PropTypes from "prop-types";

function ResultList({
  searchResults,
  searchLoading,
  searchError,
  onClick,
  onCloseModal,
  infoResults,
  infoLoading,
  infoError,
  isOpenModal,
}) {
  return (
    <div className="results">
      {searchResults.map((result) => {
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
      })}
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
//for each result it's own modal? opening modal re-renders everything and causes flickering

//ResultModal shouldn't be in ResultList, rather be it's own component?

// ResultList.defaultProps = {
//   searchResults: "",
// };

ResultList.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default ResultList;
