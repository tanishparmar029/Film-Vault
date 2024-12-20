import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard";
import SearchBox from "./SearchBox";
import axios from "axios";
import Pagination from "./Pagination";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const Movie = ({ watchlist, handleAddtoWatchlist, handleRemoveFromWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // New state for genre
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (searchTerm || selectedGenre) {
      fetchMovies(searchTerm, selectedGenre, currentPage);
    } else {
      fetchLatestMovies(currentPage);
    }
  }, [searchTerm, selectedGenre, currentPage]);

  const fetchMovies = async (query, genre, page) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: "c4c9f7dc846e5d3aa826b6fb77d7faee",
            query: query,
            with_genres: genre,  // Apply genre filter
            page: page,
          },
        }
      );
      if (response.data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setMovieData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchLatestMovies = async (page) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing`,
        {
          params: {
            api_key: "c4c9f7dc846e5d3aa826b6fb77d7faee",
            page: page,
          },
        }
      );
      setMovieData(response.data.results);
      setTotalPages(response.data.total_pages);
      setNoResults(false);
    } catch (error) {
      console.error("Error fetching latest movies:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (!query && !selectedGenre) {
      fetchLatestMovies(currentPage);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value); // Set the selected genre
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="px-4 md:px-16 py-8">
      <SearchBox 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        selectedGenre={selectedGenre} 
        onGenreChange={handleGenreChange} 
      />

      {/* Latest Movies Title */}
      <h2 className="text-3xl font-thin text-left my-8 text-white"><span className="font-extrabold text-indigo-500">|</span> Latest Movies</h2>

      {noResults && (
        <div className="text-center text-xl text-gray-400 my-8">
          No movies found
        </div>
      )}

      {/* Movie Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
        {movieData.map((movie) => (
          <Moviecard
            key={movie.id}
            movieobj={movie}
            poster_path={movie.poster_path}
            name={movie.title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            watchlist={watchlist}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          handlePrev={handlePrevPage}
          handleNext={handleNextPage}
          pageNo={currentPage}
        />
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Movie;
