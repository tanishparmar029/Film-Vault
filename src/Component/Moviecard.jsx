import React from "react";

function Moviecard({
  movieobj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  const defaultPoster = "https://via.placeholder.com/200x300?text=No+Image";
  const isInWatchlist = watchlist.some((movie) => movie.id === movieobj.id);

  return (
    <div className="relative rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden bg-white flex flex-col">
      
      {/* Poster */}
      <div className="relative w-full">
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : defaultPoster}
          alt={name}
          className="w-full h-auto object-cover rounded-t-lg"
          style={{ aspectRatio: "2 / 3" }}
        />

        {/* Watchlist Icon */}
        <div
          onClick={() => (isInWatchlist ? handleRemoveFromWatchlist(movieobj) : handleAddtoWatchlist(movieobj))}
          className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 text-white"
        >
          {isInWatchlist ? "❤️" : "🤍"}
        </div>
      </div>

      {/* Movie Title */}
      <div className="bg-gray-800 py-3 px-4 text-center flex-grow">
        <h3 className="text-white text-md font-semibold break-words">{name}</h3>
      </div>
    </div>
  );
}

export default Moviecard;
