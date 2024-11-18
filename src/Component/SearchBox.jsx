import React from "react";

const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6 flex justify-center w-full">
      <input
        type="text"
        placeholder="Find movies"
        value={searchTerm}
        onChange={onSearchChange}
        className="p-4 w-full max-w-md rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      />
    </div>
  );
};

export default SearchBox;
