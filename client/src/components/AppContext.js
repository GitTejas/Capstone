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
// AppContext.js (or wherever your context is defined)
    const addRental = async (rentalData) => {
        try {
            const response = await fetch('/rentals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rentalData),
            });

            if (response.ok) {
                const newRental = await response.json();

                // Add the new rental to the state
                setRentals((prevRentals) => [...prevRentals, newRental]);
            } else {
                const errorData = await response.json();
                console.error('Error adding rental:', errorData);
            }
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
            const response = await fetch(`/movies/${updatedMovie.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Failed to update movie: ${errorDetails.message || response.statusText}`);
            }
    
            const updatedMovieFromServer = await response.json();
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

        // Update rental (PATCH)
        const updateRental = async (updatedRental) => {
            try {
                const response = await fetch(`/rentals/${updatedRental.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedRental),
                });

                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(`Failed to update rental: ${errorDetails.message || response.statusText}`);
                }

                // Update rental in state
                const updatedRentalFromServer = await response.json();
                setRentals((prevRentals) =>
                    prevRentals.map((rental) =>
                        rental.id === updatedRentalFromServer.id ? updatedRentalFromServer : rental
                    )
                );
            } catch (error) {
                console.error('Error updating rental:', error);
            }
        };

        // Delete rental (DELETE)
        const deleteRental = async (rentalId) => {
            try {
                // Ensure rentalId is valid before making the request
                if (!rentalId) {
                    throw new Error('Rental ID is required for deletion');
                }

                // Optimistic UI update: Remove the rental locally first
                setRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== rentalId));

                const response = await fetch(`/rentals/${rentalId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    // If deletion fails, restore the rental to the state
                    setRentals((prevRentals) => [...prevRentals, { id: rentalId }]);
                    throw new Error(`Failed to delete rental. Status code: ${response.status}`);
                }

                // Optionally: Remove from related state if applicable (e.g., if rentals are linked to users or movies)
                // You can remove the rental from other states (like users or movies) if needed.
            } catch (error) {
                console.error('Error deleting rental:', error);
            }
        };

            
        // Function to add a new user
        const addUser = async (newUser) => {
            try {
                const response = await fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }
                const addedUser = await response.json();
                setUsers((prevUsers) => [...prevUsers, addedUser]);
            } catch (error) {
                console.error('Error adding user:', error);
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
            updateRental,
            deleteRental,
            addUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};
