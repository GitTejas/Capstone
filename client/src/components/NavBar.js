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
            to="/members"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Members
          </Link>
        </li>
        <li>
          <Link
            to="/exercises"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Exercises
          </Link>
        </li>
        <li>
          <Link
            to="/workouts"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Workouts
          </Link>
        </li>
        <li>
          <Link
            to="/goals"
            className="text-lime-500 font-bold uppercase transition-colors duration-300 ease-in-out hover:text-yellow-300 hover:scale-110 active:scale-100"
          >
            Goals
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
