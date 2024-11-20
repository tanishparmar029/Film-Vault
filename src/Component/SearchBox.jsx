import React from "react";
import genreids from "../Utility/genres"; // Import genre mapping

const SearchBox = ({ searchTerm, onSearchChange, selectedGenre, onGenreChange }) => {
  return (
    <div className="mb-6 flex justify-center w-full">
      <input
        type="text"
        placeholder="Find movies"
        value={searchTerm}
        onChange={onSearchChange}
        className="p-4 w-full max-w-md rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      />
      
      {/* Genre Filter Dropdown */}
      <select
        value={selectedGenre}
        onChange={onGenreChange}
        className="ml-4 p-4 bg-gray-900 text-white rounded-lg"
      >
        <option value="">All Genres</option>
        {Object.entries(genreids).map(([id, genre]) => (
          <option key={id} value={id}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
