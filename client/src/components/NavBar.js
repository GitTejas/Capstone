import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-12 py-4 flex justify-between items-center shadow-lg rounded-md">
      <ul className="flex gap-8 list-none m-0 p-0">
        <li>
          <Link
            to="/"
            className="text-white font-semibold uppercase tracking-wide transition-transform duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-95"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="text-white font-semibold uppercase tracking-wide transition-transform duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-95"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/rentals"
            className="text-white font-semibold uppercase tracking-wide transition-transform duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-95"
          >
            Rent
          </Link>
        </li>
        <li>
          <Link
            to="/ratings"
            className="text-white font-semibold uppercase tracking-wide transition-transform duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-95"
          >
            Reviews
          </Link>
        </li>
      </ul>
      <div className="text-white font-semibold text-xl tracking-wide">
        <span>🎬 Movie App</span>
      </div>
    </nav>
  );
}

export default Navbar;
