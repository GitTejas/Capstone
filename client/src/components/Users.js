import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


function Users() {
  const { users, loading, addUser } = useContext(AppContext);

const formik = useFormik({
  initialValues: {
    name: '',
    email: '',
  },
  validationSchema: Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  }),
  onSubmit: (values) => {
    addUser(values); 
    formik.resetForm(); 
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
      <form
        onSubmit={formik.handleSubmit}
        className="mb-8 space-y-6 p-6 rounded-xl shadow-xl bg-gradient-to-r from-blue-400 to-teal-300 relative overflow-hidden"
      >
        {/* Shimmer effect - Ensure it's behind the form */}
        <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer bg-[length:200%_100%] z-0"></div>

        <h3 className="relative text-2xl font-bold text-white mb-4 z-10">Add New User</h3>

        <div className="relative mb-6 z-10">
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

        <div className="relative mb-6 z-10">
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
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 shadow-md hover:shadow-lg z-10"
        >
          Add User
        </button>
      </form>


      {/* Display users and rented movies */}
      {users.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No users found.</p>
      ) : (
        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-xl">
          <table className="w-full text-lg text-left text-gray-700 border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-8 py-4 border-b border-gray-300">Name</th>
                <th className="px-8 py-4 border-b border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <td className="px-8 py-4 border-b border-gray-200">{user.name}</td>
                  <td className="px-8 py-4 border-b border-gray-200">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;