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

    // Function to add a new rental
    const addRental = async (newRental) => {
        try {
            const response = await fetch('/rentals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRental),
            });
            if (!response.ok) {
                throw new Error('Failed to add rental');
            }
            const addedRental = await response.json();
            setRentals((prevRentals) => [...prevRentals, addedRental]);
        } catch (error) {
            console.error('Error adding rental:', error);
        }
    };

    // Function to add a new movie
    const addMovie = async (newMovie) => {
        try {
            const response = await fetch('/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            });
            if (!response.ok) {
                throw new Error('Failed to add movie');
            }
            const addedMovie = await response.json();
            setMovies((prevMovies) => [...prevMovies, addedMovie]);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    // Function to edit a movie
    const editMovie = async (updatedMovie) => {
        try {
            if (!updatedMovie.id) {
                console.error("Movie ID is missing");
                return;
            }
    
            const response = await fetch(`/movies/${updatedMovie.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update movie. Status code: ${response.status}`);
            }
    
            const updatedMovieFromServer = await response.json();
            console.log(updatedMovieFromServer);  // Check the response data
    
            // Update the state with the updated movie
            setMovies((prevMovies) =>
                prevMovies.map((movie) =>
                    movie.id === updatedMovieFromServer.id ? updatedMovieFromServer : movie
                )
            );
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };    
    

    // Function to delete a movie
    // Function to delete a movie
    const deleteMovie = async (movieId) => {
        try {
            // Ensure movieId is valid before making the request
            if (!movieId) {
                throw new Error('Movie ID is required for deletion');
            }

            // Optimistic UI update: Remove the movie locally first
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));

            const response = await fetch(`/movies/${movieId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // If the deletion fails, restore the movie to the state
                setMovies((prevMovies) => [...prevMovies, { id: movieId }]);
                throw new Error(`Failed to delete movie. Status code: ${response.status}`);
            }

            // Optionally: Remove from related state like rentals, if applicable
            setRentals((prevRentals) => prevRentals.filter((rental) => rental.movieId !== movieId));

        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    
    

    return (
        <AppContext.Provider value={{
            movies,
            rentals,
            users,
            ratings,
            loading,
            setMovies,
            setRentals,
            setUsers,
            setRatings,
            addMovie,
            addRental,
            editMovie, // Add the editMovie method to the context
            deleteMovie, // Add the deleteMovie method to the context
        }}>
            {children}
        </AppContext.Provider>
    );
};
