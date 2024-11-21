import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [users, setUsers] = useState([]);
    const [ratings, setRatings] = useState([]); // Add ratings state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all initial data including ratings
        Promise.all([
            fetch('/movies').then((res) => res.json()),
            fetch('/rentals').then((res) => res.json()),
            fetch('/users').then((res) => res.json()),
            fetch('/ratings').then((res) => res.json()), // Add ratings API endpoint
        ])
            .then(([moviesData, rentalsData, usersData, ratingsData]) => {
                setMovies(moviesData);
                setRentals(rentalsData);
                setUsers(usersData);
                setRatings(ratingsData); // Set the ratings data
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Function to add a new movie
    const addMovie = (newMovie) => {
        // Ideally, this would be a POST request to your backend API
        // to save the movie in your database
        setMovies((prevMovies) => [...prevMovies, newMovie]);
    };

    return (
        <AppContext.Provider value={{ movies, rentals, users, ratings, loading, setMovies, setRentals, setUsers, setRatings, addMovie }}>
            {children}
        </AppContext.Provider>
    );
};
