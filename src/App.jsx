import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import WatchList from "./Component/WatchList";
import Movie from "./Component/Movie";
import "./App.css";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isOnline, setIsOnline] = useState(false);  // We start with isOnline as false

  useEffect(() => {
    const handleOnline = () => {
      // Only show online message if the user was offline
      if (isOffline) {
        setIsOnline(true);
        setTimeout(() => setIsOnline(false), 2000); // Hide the online message after 2 seconds
      }
      setIsOffline(false); // Set offline to false as the user is online
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsOnline(false); // Hide online message when going offline
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOffline]);  // Re-run this effect only when `isOffline` changes

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
      {/* Offline notification */}
      {isOffline && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-4 font-bold z-50">
          <h1>You are offline. Please connect to internet to access the app.</h1>
        </div>
      )}

      {/* Online notification (brief popup) */}
      {isOnline && (
        <div className="fixed top-0 left-0 w-full bg-green-600 text-white text-center p-4 font-bold z-50 transition-opacity duration-300 ease-in-out opacity-100">
          <h1>You are back online!</h1>
        </div>
      )}

      {/* App Content */}
      {!isOffline && (
        <>
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
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
