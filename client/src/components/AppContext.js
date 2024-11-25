import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [users, setUsers] = useState([]);
    const [ratings, setRatings] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/movies').then((res) => res.json()),
            fetch('/rentals').then((res) => res.json()),
            fetch('/users').then((res) => res.json()),
            fetch('/ratings').then((res) => res.json()),
        ])
            .then(([moviesData, rentalsData, usersData, ratingsData]) => {
                setMovies(moviesData);
                setRentals(rentalsData);
                setUsers(usersData);
                setRatings(ratingsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);


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
    
      

    const deleteMovie = async (movieId) => {
        try {
            const response = await fetch(`/movies/${movieId}`, { method: 'DELETE' });
    
            if (response.ok) {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    
                // Remove rentals associated with this movie
                setRentals((prevRentals) => prevRentals.filter((rental) => rental.movie_id !== movieId));
            } else {
                console.error('Error deleting movie:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };
          
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

        const deleteRental = async (rentalId) => {
            try {
                if (!rentalId) {
                    throw new Error('Rental ID is required for deletion');
                }

                setRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== rentalId));

                const response = await fetch(`/rentals/${rentalId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    setRentals((prevRentals) => [...prevRentals, { id: rentalId }]);
                    throw new Error(`Failed to delete rental. Status code: ${response.status}`);
                }
            } catch (error) {
                console.error('Error deleting rental:', error);
            }
        };

            
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


        const addRating = async (newRating) => {
            try {
              const response = await fetch("/ratings", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  movie_id: newRating.movieId,
                  user_id: newRating.userId,
                  rating: newRating.rating,
                  review: newRating.review,
                }),
              });
          
              if (!response.ok) {
                throw new Error("Failed to add rating");
              }
          
              const data = await response.json();
          
              // After the rating is added, update the context state with the new rating
              setRatings((prevRatings) => [...prevRatings, data]);
            } catch (error) {
              console.error("Error adding rating:", error);
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
            editMovie,
            deleteMovie,
            updateRental,
            deleteRental,
            addUser,
            addRating,
        }}>
            {children}
        </AppContext.Provider>
    );
};