import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Favorites from "./components/Favorites";
import Home from "./components/Home";

function App() {
  // const [searchValue, setSearchValue] = useState("");
  // const [searchType, setSearchType] = useState("");
  // const [hiddenPagination, setHiddenPagination] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [queryUrl, setQueryUrl] = useState("");
  // const [queryResult, setQueryResult] = useState([]);
  // const [maxPages, setMaxPages] = useState(1);
  // const [idInfo, setIdInfo] = useState("");

  // const SEARCH_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;

  // const [
  //   { resultData, totalResults },
  //   setQueryParams,
  //   isSearchLoading,
  //   isSearchError,
  //   isResult,
  // ] = useOmdbAPISearch();

  // useEffect(() => {
  //   setQueryParams({ url: queryUrl, page: currentPage, type: searchType });
  // }, [setQueryParams, queryUrl, currentPage, searchType]);

  // const [isOpenModal, setIsOpenModal] = useState(false);

  // useEffect(() => {
  //   const resultsPerPage = 10;
  //   const numOfPages = Math.ceil(totalResults / resultsPerPage);
  //   setMaxPages(numOfPages || 1);
  // }, [totalResults]);

  // useEffect(() => {
  //   if (isResult && resultData) {
  //     setQueryResult(resultData);
  //     setHiddenPagination(false);
  //   }
  // }, [resultData, isResult]);

  // const [
  //   infoResult,
  //   isInfoLoading,
  //   isInfoError,
  //   setInfoQueryId,
  // ] = useOmdbAPIGetInfo(BASE_URL);

  // useEffect(() => {
  //   setInfoQueryId(idInfo);
  // }, [setInfoQueryId, idInfo]);

  // function handleKeyPress(e) {
  //   if (e.key !== "Enter") return;
  //   if (!searchValue) return;
  //   setCurrentPage(1);
  //   setQueryUrl(SEARCH_URL);
  // }
  // function handleClickSearch() {
  //   if (!searchValue) return;
  //   setCurrentPage(1);
  //   setQueryUrl(SEARCH_URL);
  // }
  // function handleClickImage(id) {
  //   setIdInfo(id);
  //   setIsOpenModal(true);
  // }
  // function handleCloseModal() {
  //   setIsOpenModal(false);
  // }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
