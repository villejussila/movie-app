export function nullOmdbAPISearchResults() {
  return [
    {
      imdbID: null,
      Title: null,
      Year: null,
      Poster: null,
    },
  ];
}

export function removeDuplicateResultsFromArray(array = [], id = "") {
  if (array == null) return;
  let seen = {};
  let returnArray = [];
  array.forEach((movie) => {
    let uniqueId = movie[id];
    if (!seen[uniqueId]) {
      seen[uniqueId] = uniqueId;
      returnArray.push(movie);
    }
  });
  return returnArray;
}
