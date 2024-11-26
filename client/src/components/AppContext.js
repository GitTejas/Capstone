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
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const addRental = (rentalData) => {
        fetch('/rentals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rentalData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((newRental) => {
                setRentals((prevRentals) => [...prevRentals, newRental]);
            })
            .catch(() => {});
    };

    const addMovie = (newMovie) => {
        fetch('/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((addedMovie) => {
                setMovies((prevMovies) => [...prevMovies, addedMovie]);
            })
            .catch(() => {});
    };

    const editMovie = (updatedMovie) => {
        fetch(`/movies/${updatedMovie.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((updatedMovieFromServer) => {
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie.id === updatedMovieFromServer.id ? updatedMovieFromServer : movie
                    )
                );
            })
            .catch(() => {});
    };

    const deleteMovie = (movieId) => {
        fetch(`/movies/${movieId}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
                    setRentals((prevRentals) =>
                        prevRentals.filter((rental) => rental.movie_id !== movieId)
                    );
                }
            })
            .catch(() => {});
    };

    const updateRental = (updatedRental) => {
        fetch(`/rentals/${updatedRental.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRental),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((updatedRentalFromServer) => {
                setRentals((prevRentals) =>
                    prevRentals.map((rental) =>
                        rental.id === updatedRentalFromServer.id ? updatedRentalFromServer : rental
                    )
                );
            })
            .catch(() => {});
    };

    const deleteRental = (rentalId) => {
        if (!rentalId) {
            return;
        }

        setRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== rentalId));

        fetch(`/rentals/${rentalId}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    setRentals((prevRentals) => [...prevRentals, { id: rentalId }]);
                }
            })
            .catch(() => {});
    };

    const addUser = (newUser) => {
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((addedUser) => {
                setUsers((prevUsers) => [...prevUsers, addedUser]);
            })
            .catch(() => {});
    };

    const addRating = (newRating) => {
        fetch('/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie_id: newRating.movieId,
                user_id: newRating.userId,
                rating: newRating.rating,
                review: newRating.review,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setRatings((prevRatings) => [...prevRatings, data]);
            })
            .catch(() => {});
    };

    return (
        <AppContext.Provider
            value={{
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
