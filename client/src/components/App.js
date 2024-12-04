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
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/users" element={<Users />} />
          <Route path="/ratings" element={<Reviews />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;