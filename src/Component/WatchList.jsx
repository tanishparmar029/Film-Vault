import React, { useEffect, useState } from "react";
import genreids from "../Utilitty/genres"; // Genre mapping file

// Rating stars helper function
const getRatingStars = (rating) => {
  const filledStars = Math.round(rating / 2); // assuming rating is between 0 and 10
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < filledStars ? "text-yellow-500" : "text-gray-400"}
    >
      &#9733;
    </span>
  ));
};

const WatchList = ({ watchlist, handleRemoveFromWatchlist }) => {
  const [search, setSearch] = useState("");
  const [genrelist, SetGenreList] = useState(["All Genre"]);
  const [currGenre, SetCurrGenre] = useState("All Genre");

  useEffect(() => {
    let temp = watchlist.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    SetGenreList([...new Set(temp)]);
  }, [watchlist]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (genre) => SetCurrGenre(genre);

  const filteredMovies = watchlist.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (currGenre === "All Genre" || genreids[movie.genre_ids[0]] === currGenre)
  );

  return (
    <div className="bg-gray-900 p-6 text-white min-h-screen">
      <div className="flex gap-4 justify-between items-center mb-6">
        <input
          className="w-full sm:w-2/3 lg:w-3/4 p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Find your movies"
          onChange={handleSearch}
          value={search}
        />
        <select
          value={currGenre}
          className="w-full sm:w-1/4 p-3 rounded-lg bg-gray-800 text-white"
          onChange={(e) => handleFilter(e.target.value)}
        >
          {genrelist.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Message if no results found */}
      {filteredMovies.length === 0 && (
        <p className="text-center text-xl text-gray-400 mt-6">
          No results found
        </p>
      )}

      {/* Latest Movies Title */}
      <h2 className="text-3xl font-thin text-left my-8 text-white">
        <span className="font-extrabold text-indigo-500">|</span> Your Watchlist
      </h2>

      {/* Movie Grid with Modern and Trendy Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-xl bg-gray-800 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:translate-y-2"
          >
            {/* Movie Poster */}
            <div className="relative w-full h-0 pb-[150%] sm:pb-[175%] lg:pb-[125%]">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="p-3">
              <h2 className="font-bold text-lg text-gray-100 truncate">
                {movie.title}
              </h2>

              {/* Rating Section with Stars */}
              <div className="flex items-center gap-1 mt-2">
                <p className="text-yellow-500">
                  {getRatingStars(movie.vote_average)}
                </p>
                <p className="text-sm text-gray-400">{movie.vote_average}</p>
              </div>

              {/* Genre List with Color */}
              <div className="mt-2 flex flex-wrap gap-2">
                {movie.genre_ids.map((id) => {
                  const genre = genreids[id];
                  const genreColor =
                    genre === currGenre ? "bg-blue-500" : "bg-gray-600"; // Dynamic background color for active genre
                  return (
                    <span
                      key={id}
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full text-white ${genreColor}`}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>

              {/* Remove from Watchlist Button */}
              <div
                onClick={() => handleRemoveFromWatchlist(movie)}
                className="absolute top-2 right-2 p-3 bg-gray-800/70 text-white rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                &#10060;
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
