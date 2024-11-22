import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 px-12 py-4 flex justify-between items-center">
      <ul className="flex gap-8 list-none m-0 p-0">
        <li>
          <Link
            to="/"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/rentals"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Rentals
          </Link>
        </li>
        <li>
          <Link
            to="/ratings"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            to="/newform"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Form
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
