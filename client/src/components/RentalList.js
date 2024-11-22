import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RentalList() {
    const { rentals, loading, users, movies, addRental } = useContext(AppContext);

    // Formik setup for adding a new rental
    const formik = useFormik({
        initialValues: {
            user_id: '',
            movie_id: '',
            due_date: '',
        },
        validationSchema: Yup.object({
            user_id: Yup.string().required('User is required'),
            movie_id: Yup.string().required('Movie is required'),
            due_date: Yup.date().required('Due date is required'),
        }),
        onSubmit: (values) => {
            addRental(values);
        },
    });

    if (loading) {
        return <p>Loading rentals...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Rental List</h2>

            {/* Rental Form */}
            <form onSubmit={formik.handleSubmit} className="my-4 space-y-4">
                <div>
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User</label>
                    <select
                        id="user_id"
                        name="user_id"
                        onChange={formik.handleChange}
                        value={formik.values.user_id}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.user_id && formik.errors.user_id && (
                        <div className="text-red-500 text-sm">{formik.errors.user_id}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="movie_id" className="block text-sm font-medium text-gray-700">Movie</label>
                    <select
                        id="movie_id"
                        name="movie_id"
                        onChange={formik.handleChange}
                        value={formik.values.movie_id}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    {formik.touched.movie_id && formik.errors.movie_id && (
                        <div className="text-red-500 text-sm">{formik.errors.movie_id}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        onChange={formik.handleChange}
                        value={formik.values.due_date}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {formik.touched.due_date && formik.errors.due_date && (
                        <div className="text-red-500 text-sm">{formik.errors.due_date}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
                >
                    Add Rental
                </button>
            </form>

            {rentals.length === 0 ? (
                <p>No rentals found.</p>
            ) : (
                <table className="min-w-full table-auto mt-6">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Movie</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental) => {
                            // Find the user and movie by their IDs
                            const user = users.find(user => user.id === rental.user_id);
                            const movie = movies.find(movie => movie.id === rental.movie_id);

                            return (
                                <tr key={rental.id}>
                                    <td className="border px-4 py-2">{user ? user.name : 'User Not Found'}</td>
                                    <td className="border px-4 py-2">{movie ? movie.title : 'Movie Not Found'}</td>
                                    <td className="border px-4 py-2">
                                        {rental.due_date && !isNaN(new Date(rental.due_date))
                                            ? new Date(rental.due_date).toLocaleDateString()
                                            : 'Invalid Date'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RentalList;
