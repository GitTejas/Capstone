import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';
import MovieList from './MovieList';
import RentalList from './RentalList';
import RatingsList from './RatingList'; 
import Home from './Home';
import UsersList from './UsersList';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        {/* Updated container: use full width and center */}
        <div className="min-h-screen w-full px-4 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/rentals" element={<RentalList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/ratings" element={<RatingsList />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
