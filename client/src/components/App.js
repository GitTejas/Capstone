import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';
import Movies from './Movies';
import Rentals from './Rentals';
import Reviews from './Reviews';
import Home from './Home';
import Users from './Users';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        {/* Updated container: use full width and center */}
        <div className="min-h-screen w-full px-4 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/users" element={<Users />} />
            <Route path="/ratings" element={<Reviews />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;