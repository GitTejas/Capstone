import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';
import Movies from './Movies';
import Rentals from './Rentals';
import Reviews from './Reviews';
import Home from './Home';
import Users from './Users';
import Layout from './Layout';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/movies" element={<Layout><Movies /></Layout>} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/users" element={<Users />} />
          <Route path="/ratings" element={<Reviews />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;