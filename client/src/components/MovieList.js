import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string().max(100, 'Title must be less than 100 characters').required('Title is required'),
  genre: Yup.string().max(50, 'Genre must be less than 50 characters').required('Genre is required'),
  release_year: Yup.number()
    .min(1900, 'Release year must be later than 1900')
    .max(new Date().getFullYear(), 'Release year cannot be in the future')
    .required('Release year is required'),
  image_url: Yup.string()
    .url('Please provide a valid image URL')
    .required('Image URL is required'),
});

function MovieList() {
  const { movies, loading, addMovie } = useContext(AppContext);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading movies...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Form at the top of the page */}
      <Formik
        initialValues={{
          title: '',
          genre: '',
          release_year: '',
          image_url: '', // Added field for image URL
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          addMovie(values);
        }}
      >
        {(formik) => {
          // Store Formik instance in a constant
          const { getFieldProps, isSubmitting, touched, errors } = formik;

          return (
            <Form className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Add a New Movie</h2>
              
              {/* Title Field */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  {...getFieldProps('title')}
                  type="text"
                  id="title"
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                {touched.title && errors.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>

              {/* Genre Field */}
              <div className="mb-4">
                <label htmlFor="genre" className="block text-gray-700">Genre</label>
                <input
                  {...getFieldProps('genre')}
                  type="text"
                  id="genre"
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                {touched.genre && errors.genre && (
                  <div className="text-red-500 text-sm">{errors.genre}</div>
                )}
              </div>

              {/* Release Year Field */}
              <div className="mb-4">
                <label htmlFor="release_year" className="block text-gray-700">Release Year</label>
                <input
                  {...getFieldProps('release_year')}
                  type="number"
                  id="release_year"
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                {touched.release_year && errors.release_year && (
                  <div className="text-red-500 text-sm">{errors.release_year}</div>
                )}
              </div>

              {/* Image URL Field */}
              <div className="mb-4">
                <label htmlFor="image_url" className="block text-gray-700">Image URL</label>
                <input
                  {...getFieldProps('image_url')}
                  type="text"
                  id="image_url"
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                {touched.image_url && errors.image_url && (
                  <div className="text-red-500 text-sm">{errors.image_url}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {isSubmitting ? 'Adding...' : 'Add Movie'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Movie List</h2>
      {movies.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No movies found.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-lg rounded-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Genre</th>
              <th className="p-4 text-left">Release Year</th>
            </tr>
          </thead>
            <tbody>
          {movies.map((movie, index) => (
            <tr
              key={movie.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-gray-200 transition duration-200`}
            >
              {/* Movie Title with Image */}
              <td className="p-4 flex items-center">
                {/* Movie Image */}
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-16 h-16 object-cover rounded-md mr-4" // You can adjust the size here
                />
                <span className="text-lg font-semibold">{movie.title}</span>
              </td>

              <td className="p-4">{movie.genre}</td>
              <td className="p-4">{movie.release_year}</td>
            </tr>
          ))}
        </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieList;
