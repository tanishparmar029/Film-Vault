import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import WatchList from "./Component/WatchList";
import Movie from "./Component/Movie";
import "./App.css";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const movieFromLocalstorage = localStorage.getItem("movieApp");
    if (movieFromLocalstorage) {
      setWatchlist(JSON.parse(movieFromLocalstorage));
    }
  }, []);

  const handleAddtoWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
    localStorage.setItem("movieApp", JSON.stringify(filteredWatchlist));
    setWatchlist(filteredWatchlist);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/movie"
          element={
            <Movie
              watchlist={watchlist}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
