import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string().max(100, 'Title must be less than 100 characters').required('Title is required'),
  genre: Yup.string().max(50, 'Genre must be less than 50 characters').required('Genre is required'),
  release_year: Yup.number()
    .min(1900, 'Release year must be later than 1900')
    .max(new Date().getFullYear(), 'Release year cannot be in the future')
    .required('Release year is required'),
  image: Yup.string()
    .url('Please provide a valid image URL')
    .required('Image URL is required'),
});

function MovieList() {
  const { movies, loading, addMovie, setMovies, editMovie, deleteMovie } = useContext(AppContext);
  const [editMovieData, setEditMovieData] = useState(null); // For editing movie

  // Function to handle editing a movie
  const handleEdit = (movie) => {
    setEditMovieData(movie);
    window.scrollTo(0, 0); // Scroll to the top when the edit button is clicked
  };

  // If data is loading
  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading movies...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Form to Add or Edit a Movie */}
      <Formik
    enableReinitialize={true}
    initialValues={{
        title: editMovieData ? editMovieData.title : '',
        genre: editMovieData ? editMovieData.genre : '',
        release_year: editMovieData ? editMovieData.release_year : '',
        image: editMovieData ? editMovieData.image : '',  // Change this from image_url to image
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
        if (editMovieData) {
            // Update existing movie
            setMovies((prevMovies) =>
                prevMovies.map((movie) =>
                    movie.id === editMovieData.id ? { ...movie, ...values } : movie
                )
            );
            setEditMovieData(null); // Reset edit state
        } else {
            // Add new movie
            addMovie(values);
        }
    }}
>
  {(formik) => {
    const { getFieldProps, isSubmitting, touched, errors } = formik;

    return (
      <Form className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editMovieData ? 'Edit Movie' : 'Add a New Movie'}
        </h2>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            {...getFieldProps('title')}
            type="text"
            id="title"
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          {touched.title && errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
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
          {touched.genre && errors.genre && <div className="text-red-500 text-sm">{errors.genre}</div>}
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
          {touched.release_year && errors.release_year && <div className="text-red-500 text-sm">{errors.release_year}</div>}
        </div>

        {/* Image Field */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image URL</label>
          <input
            {...getFieldProps('image')}
            type="text"
            id="image"
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          {touched.image && errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {isSubmitting ? (editMovieData ? 'Updating...' : 'Adding...') : (editMovieData ? 'Update Movie' : 'Add Movie')}
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
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr
                key={movie.id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition duration-200`}
              >
                <td className="p-4 flex items-center">
                  <img
                    src={movie.image} 
                    alt={movie.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <span className="text-lg font-semibold">{movie.title}</span>
                </td>
                <td className="p-4">{movie.genre}</td>
                <td className="p-4">{movie.release_year}</td>
                <td className="p-4 flex space-x-4">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMovie(movie.id)} // Directly using deleteMovie
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieList;
