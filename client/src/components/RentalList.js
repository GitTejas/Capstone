import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


function RentalList() {
    const { rentals, loading, users, movies, addRental, updateRental, deleteRental } = useContext(AppContext);

    const [sortOption, setSortOption] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentRental, setCurrentRental] = useState(null);

    const formik = useFormik({
        initialValues: {
            user_id: '',
            movie_id: '',
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
            formik.resetForm();
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

    // Sorting logic for rentals by user name, movie title, or due date
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

    // Group rentals by user and sort users alphabetically
    const rentalsByUser = users.map(user => {
        const userRentals = sortedRentals.filter(rental => rental.user_id === user.id);
        return { user, rentals: userRentals };
    });

    const sortedRentalsByUser = rentalsByUser.sort((a, b) => 
        a.user.name.localeCompare(b.user.name)
    );

    if (loading) {
        return <p>Loading rentals...</p>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <h2 className="text-2xl font-semibold mb-4">Rental List</h2>

            {/* Introductory paragraph */}
            <div className="bg-gradient-to-r from-teal-500 via-indigo-500 to-blue-600 text-white p-8 rounded-lg shadow-xl mb-8 border border-blue-400">
            <p className="text-lg font-semibold">
                In order to rent your favorite movies, you must be{' '}
                <Link 
                to="/users" 
                className="underline font-bold text-yellow-200 hover:text-yellow-400"
                >
                signed up as a user
                </Link>{' '}
                in our system. Click the hyperlink to redirect you to the users page, enter your name and email to get started, and enjoy a seamless rental experience!
            </p>
            </div>

            {/* Rental Form */}
            <form
                onSubmit={formik.handleSubmit}
                className="my-4 space-y-6 p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100"
            >
                <h3 className="text-lg font-medium">{editMode ? 'Edit Rental' : 'Add Rental'}</h3>

                {/* User Select */}
                <div>
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User</label>
                    <select
                        id="user_id"
                        name="user_id"
                        onChange={formik.handleChange}
                        value={formik.values.user_id}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
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
                <div>
                    <label htmlFor="movie_id" className="block text-sm font-medium text-gray-700">Movie</label>
                    <select
                        id="movie_id"
                        name="movie_id"
                        onChange={formik.handleChange}
                        value={formik.values.movie_id}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    {formik.touched.movie_id && formik.errors.movie_id && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.movie_id}</div>
                    )}
                </div>

                {/* Due Date Input */}
                <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        onChange={formik.handleChange}
                        value={formik.values.due_date}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.due_date && formik.errors.due_date && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.due_date}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    {editMode ? 'Update Rental' : 'Add Rental'}
                </button>
            </form>

            {/* Sorting Dropdown */}
            <div className="relative mb-4">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select an option</option>
                    {/* <option value="user">User Name (A-Z)</option> */}
                    <option value="movie">Movie Title (A-Z)</option>
                    <option value="due_date">Due Date (Earliest to Latest)</option>
                </select>
            </div> 

            {/* Rentals by User */}
            {sortedRentalsByUser.length === 0 ? (
                <p className="text-center text-gray-500">No rentals found.</p>
            ) : (
                sortedRentalsByUser.map((userGroup) => (
                    <div key={userGroup.user.id}>
                        <h3 className="text-lg font-medium mt-6">{userGroup.user.name}'s Rentals</h3>
                        {userGroup.rentals.length === 0 ? (
                            <p>No rentals found for {userGroup.user.name}.</p>
                        ) : (
                            <div className="overflow-x-auto shadow-md rounded-lg mt-4">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Movie</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {userGroup.rentals.map((rental) => {
                                            const movie = movies.find((movie) => movie.id === rental.movie_id);
                                            return (
                                                <tr key={rental.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{movie?.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(rental.due_date).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleEdit(rental)}
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(rental.id)}
                                                            className="ml-4 text-red-500 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default RentalList;
