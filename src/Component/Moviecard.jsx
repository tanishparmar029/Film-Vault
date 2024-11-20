import React from "react";
import { toast } from "react-toastify"; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import genreids from "../Utility/genres"; // Import genre mapping

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

  // Function to display toast message
  const showToast = (action) => {
    if (action === "add") {
      toast.success(
        <span ><strong className="text-green-500">{name}</strong> has been added to your watchlist!</span>, {
          position: "top-right", 
          autoClose: 1000, 
          hideProgressBar: true, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          style: {
            backgroundColor: "#333", // Dark background
            color: "#fff", // White text
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
          }
        }
      );
    } else if (action === "remove") {
      toast.info(
        <span><strong className="text-blue-400">{name}</strong> has been removed from your watchlist!</span>, {
          position: "top-right", 
          autoClose: 1000, 
          hideProgressBar: true, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          style: {
            backgroundColor: "#333", // Dark background
            color: "#fff", // White text
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
          }
        }
      );
    }
  };

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
          onClick={() => {
            if (isInWatchlist) {
              handleRemoveFromWatchlist(movieobj);
              showToast("remove"); // Show toast for removal
            } else {
              handleAddtoWatchlist(movieobj);
              showToast("add"); // Show toast for addition
            }
          }}
          className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 text-white"
        >
          {isInWatchlist ? "❤️" : "🤍"}
        </div>
      </div>

      {/* Movie Title */}
      <div className="bg-gray-800 py-3 px-4 text-left flex-grow">
        <h3 className="text-white text-md font-semibold break-words">{name}</h3>
        
        {/* Rating Section with Stars */}
        <div className="flex items-center gap-1 mt-2">
          <p className="text-yellow-500">
            {getRatingStars(movieobj.vote_average)}
          </p>
          <p className="text-sm text-gray-400">{movieobj.vote_average}</p>
        </div>
        
        {/* Genre List */}
        <div className="mt-2 flex flex-wrap gap-2">
          {movieobj.genre_ids.map((id) => {
            const genre = genreids[id];
            return (
              <span
                key={id}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full text-white bg-gray-600"
              >
                {genre}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Moviecard;
