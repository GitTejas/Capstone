import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/rentals">Rentals</Link></li>
                <li><Link to="/ratings">Ratings</Link></li>
                <li><Link to="/newform">Form</Link></li>

            </ul>
        </nav>
    );
}

export default Navbar;
