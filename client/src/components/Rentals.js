import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import mtheatre from '../assets/mtheatre.jpg';

function Rentals() {
    const { rentals, loading, users, movies, addRental, updateRental, deleteRental, selectedMovie, setSelectedMovie } = useContext(AppContext);
    const [sortOption, setSortOption] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentRental, setCurrentRental] = useState(null);

    const formik = useFormik({
        initialValues: {
            user_id: '',
            movie_id: selectedMovie ? selectedMovie.id : '', 
            due_date: '',
        },
        validationSchema: Yup.object({
            user_id: Yup.string().required('User is required'),
            movie_id: Yup.string().required('Movie is required'),
            due_date: Yup.date()
                .required('Due date is required')
                .min(new Date(), 'Due date must be in the future'),
        }),
        onSubmit: (values) => {
            if (editMode) {
                updateRental({ ...currentRental, ...values });
                setEditMode(false);
                setCurrentRental(null);
            } else {
                addRental(values);
            }
    
            setSelectedMovie(null); 
            formik.resetForm({
                values: {
                    user_id: '', 
                    movie_id: '', 
                    due_date: '',
                }
            });  
        },
    });
    
    const handleEdit = (rental) => {
        setEditMode(true);
        setCurrentRental(rental);
        formik.setValues({
            user_id: rental.user_id,
            movie_id: rental.movie_id,
            due_date: rental.due_date,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (rentalId) => {
        deleteRental(rentalId);
    };


    const sortedRentals = [...rentals].sort((a, b) => {
        if (sortOption === 'user') {
            const userA = users.find((user) => user.id === a.user_id)?.name || '';
            const userB = users.find((user) => user.id === b.user_id)?.name || '';
            return userA.localeCompare(userB);
        } else if (sortOption === 'movie') {
            const movieA = movies.find((movie) => movie.id === a.movie_id)?.title || '';
            const movieB = movies.find((movie) => movie.id === b.movie_id)?.title || '';
            return movieA.localeCompare(movieB);
        } else if (sortOption === 'due_date') {
            return new Date(a.due_date) - new Date(b.due_date);
        }
        return 0;
    });

    const rentalsByUser = users.map(user => {
        const userRentals = sortedRentals.filter(rental => rental.user_id === user.id);
        return { user, rentals: userRentals };
    });

    const sortedRentalsByUser = rentalsByUser.sort((a, b) => 
        a.user.name.localeCompare(b.user.name)
    );

    const rentedMoviesByUser = (userId) => {
        return rentals
            .filter((rental) => rental.user_id === userId) 
            .map((rental) => rental.movie_id);
    };
    
    if (loading) {
        return <p>Loading rentals...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900"
        style={{
            backgroundImage: `url(${mtheatre})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            minHeight: '100vh',
          }} 
        >
            <h2 className="text-3xl font-semibold text-white text-center mb-6">Rental List</h2>


            {/* Introductory paragraph */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg mb-8">
                <p className="text-lg font-medium">
                    In order to rent your favorite movies, you must be{' '}
                    <Link
                        to="/users"
                        className="text-yellow-300 hover:text-yellow-500 font-semibold"
                    >
                        signed up as a user
                    </Link>{' '}
                    in our system. Click the link to get started and enjoy seamless rentals!
                </p>
            </div>

            {/* Rental Form */}
            <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 p-8 bg-gradient-to-br from-purple-400 via-blue-300 to-teal-100 shadow-xl rounded-lg max-w-3xl mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
                <h3 className="text-xl font-semibold">{editMode ? 'Edit Rental' : 'Add Rental'}</h3>

                {/* User Select */}
                <div className="space-y-2">
                    <label htmlFor="user_id" className="text-sm font-medium text-gray-700">User</label>
                    <select
                        id="user_id"
                        name="user_id"
                        onChange={formik.handleChange}
                        value={formik.values.user_id}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={editMode}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.user_id && formik.errors.user_id && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.user_id}</div>
                    )}
                </div>

                {/* Movie Select */}
                <div className="space-y-2">
                    <label htmlFor="movie_id" className="text-sm font-medium text-gray-700">Movie</label>
                    <select
                    id="movie_id"
                    name="movie_id"
                    onChange={formik.handleChange}
                    value={formik.values.movie_id || ''} 
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={!formik.values.user_id} 
                >
                    <option value="">
                        {formik.values.user_id ? 'Select a movie' : 'Select a user first'}
                    </option>
                    {movies.map((movie) => {
                        const isRented =
                            formik.values.user_id &&
                            rentedMoviesByUser(formik.values.user_id).includes(movie.id);

                        return (
                            <option key={movie.id} value={movie.id} disabled={isRented}>
                                {movie.title} {isRented ? '(Already Rented)' : ''}
                            </option>
                        );
                    })}
                </select>

                    {formik.touched.movie_id && formik.errors.movie_id && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.movie_id}</div>
                    )}
                </div>

                {/* Due Date Input */}
                <div className="space-y-2">
                    <label htmlFor="due_date" className="text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        onChange={formik.handleChange}
                        value={formik.values.due_date}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formik.touched.due_date && formik.errors.due_date && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.due_date}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                    {editMode ? 'Update Rental' : 'Add Rental'}
                </button>
            </form>

            {/* Sorting Dropdown */}
            <div className="relative mb-6 mt-4 max-w-xs mx-auto">
                <label htmlFor="sort" className="text-sm font-medium text-gray-100">Sort By</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select an option</option>
                    <option value="movie">Movie Title (A-Z)</option>
                    <option value="due_date">Due Date (Earliest to Latest)</option>
                </select>
            </div>

            {/* Rentals by User */}
            {sortedRentalsByUser.length === 0 ? (
                <p className="text-center text-gray-500">No rentals found.</p>
            ) : (
                sortedRentalsByUser.map((userGroup) => (
                    <div key={userGroup.user.id} className="space-y-4 mt-8">
                        <h3 className="text-2xl font-extrabold text-yellow-400 hover:text-yellow-500 transition-all duration-300 text-shadow-xl">{userGroup.user.name}'s Rentals</h3>

                        {userGroup.rentals.length === 0 ? (
                            <p className="text-lg text-gray-100">No rentals found for {userGroup.user.name}.</p>
                        ) : (
                            <div className="overflow-x-auto shadow-xl rounded-lg mt-4">
                                <table className="min-w-full bg-indigo-100 rounded-lg overflow-hidden">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium">Movie Title</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium">Due Date</th>
                                            <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-indigo-200">
                                        {userGroup.rentals.map((rental) => (
                                            <tr key={rental.id} className="hover:bg-indigo-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{movies.find((movie) => movie.id === rental.movie_id)?.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{rental.due_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => handleEdit(rental)}
                                                        className="px-4 py-2 mr-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(rental.id)}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link
                                                    to={{
                                                        pathname: "/ratings",
                                                        state: { movie: movies.find((movie) => movie.id === rental.movie_id) },
                                                    }}
                                                    className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mx-2"
                                                >
                                                    Review
                                                </Link>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Rentals;