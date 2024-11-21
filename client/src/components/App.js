import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';
import MovieList from './MovieList';
import RentalList from './RentalList';
import UsersList from './UsersList';
import RatingsList from './RatingList'; // Import RatingsList
import NewForm from './NewForm';
// import MovieForm from './MovieForm';
// import RatingDetail from './RatingDetail'; // Optional: if you have a detail page

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<MovieForm />} /> */}
          <Route path="/movies" element={<MovieList />} />
          <Route path="/rentals" element={<RentalList />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/ratings" element={<RatingsList />} /> {/* Add this route */}
          <Route path="/newform" element={<NewForm />} /> {/* This route will render NewForm */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
