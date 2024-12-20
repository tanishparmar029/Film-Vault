import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Clapboard.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }, []);

  useEffect(() => {
    const debouncedHandleScroll = () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(handleScroll, 200);
    };
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  const getActiveLinkClass = (path) => {
    return location.pathname === path
      ? "text-indigo-500 font-bold relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-indigo-500"
      : "text-white font-medium hover:text-indigo-500 transition duration-300";
  };

  return (
    <div className={`transition-all duration-300 ${scrolling ? "bg-gray-800 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img className="rounded-lg w-[50px] transition-transform duration-300 ease-in-out transform" src={Logo} alt="Logo" />
          <span className="ml-3 text-xl font-semibold text-white hover:text-indigo-500 transition-all duration-300">Film Vault</span>
        </div>
        <div className="hidden md:flex space-x-8 font-semibold items-center">
          <Link to="/movie" className={`text-lg px-4 py-2 rounded-lg ${getActiveLinkClass("/movie")}`}>Movie</Link>
          <Link to="/watchlist" className={`text-lg px-4 py-2 rounded-lg ${getActiveLinkClass("/watchlist")}`}>Watchlist</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4 text-center transform transition-all duration-500">
          <Link to="/movie" className={`text-lg px-4 py-2 rounded-lg ${getActiveLinkClass("/movie")}`} onClick={() => setMobileMenuOpen(false)}>Movie</Link>
          <Link to="/watchlist" className={`text-lg px-4 py-2 rounded-lg ${getActiveLinkClass("/watchlist")}`} onClick={() => setMobileMenuOpen(false)}>Watchlist</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
