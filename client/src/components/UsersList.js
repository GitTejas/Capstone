import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


function UsersList() {
  const { users, rentals, loading, movies, addUser } = useContext(AppContext);

  // Formik setup for adding a new user
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      addUser(values); // Call the addUser function from context
      formik.resetForm(); // Reset the form after submission
    },
  });
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading users...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User List</h2>

      {/* Introductory paragraph */}
      <div className="bg-gradient-to-l from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-lg font-medium">
          Welcome! To{' '}
          <Link 
            to="/rentals" 
            className="underline font-semibold text-blue-200 hover:text-blue-400"
          >
            rent
          </Link>{' '}
          your favorite movies, please sign up as a user. Just enter your name and email below, and we’ll store your contact information for a seamless experience.
        </p>
      </div>

      {/* Form for adding a new user */}
      <form onSubmit={formik.handleSubmit} className="mb-8 space-y-6 bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Add New User</h3>
        <div className="mb-6">
          <label htmlFor="name" className="block text-white text-lg font-semibold">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter user's name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-white text-lg font-semibold">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter user's email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.email}</div>
          ) : null}
        </div>
        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 shadow-md hover:shadow-lg"
        >
          Add User
        </button>
      </form>

      {/* Display users and rented movies */}
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-gray-600">Name</th>
                <th className="px-6 py-3 text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersList;