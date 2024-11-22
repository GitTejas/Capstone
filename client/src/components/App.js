import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';
import MovieList from './MovieList';
import RentalList from './RentalList';
import UsersList from './UsersList';
import RatingsList from './RatingList'; 
import NewForm from './NewForm';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-4">
          <Routes>
            <Route path="/movies" element={<MovieList />} />
            <Route path="/rentals" element={<RentalList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/ratings" element={<RatingsList />} />
            <Route path="/newform" element={<NewForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
