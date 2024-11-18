import React from "react";

function Pagination({ handlePrev, handleNext, pageNo, totalPages }) {
  return (
    <div className="p-4 mt-8 flex justify-center items-center space-x-4 rounded-md shadow-lg">
      {/* Previous Page Button */}
      <div
        onClick={handlePrev}
        className="cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
        aria-label="Previous Page"
      >
        <i className="fa-solid fa-arrow-left text-gray-400 text-xl hover:text-white"></i>
      </div>

      {/* Page Number Indicator */}
      <div className="font-bold text-gray-400 text-lg">
        Page <span className="text-white">{pageNo}</span>
      </div>

      {/* Next Page Button */}
      <div
        onClick={handleNext}
        className="cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
        aria-label="Next Page"
      >
        <i className="fa-solid fa-arrow-right text-gray-400 text-xl hover:text-white"></i>
      </div>
    </div>
  );
}

export default Pagination;
