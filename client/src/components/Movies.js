import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

function Movies() {
  const { movies, loading, addMovie, setMovies, editMovie, deleteMovie } = useContext(AppContext);
  const [editMovieData, setEditMovieData] = useState(null);
  const [sortOption, setSortOption] = useState('title');

  const handleEdit = (movie) => {
    setEditMovieData(movie);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortMovies = (movies, sortOption) => {
    switch (sortOption) {
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'genre':
        return [...movies].sort((a, b) => a.genre.localeCompare(b.genre));
      case 'release_year':
        return [...movies].sort((a, b) => a.release_year - b.release_year);
      default:
        return movies;
    }
  };

  const sortedMovies = sortMovies(movies, sortOption);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading movies...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: editMovieData ? editMovieData.title : '',
          genre: editMovieData ? editMovieData.genre : '',
          release_year: editMovieData ? editMovieData.release_year : '',
          image: editMovieData ? editMovieData.image : '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (editMovieData) {
            // Ensure that the id is passed in the updated values
            const updatedMovie = { ...values, id: editMovieData.id };  // Include the movie id
            await editMovie(updatedMovie);  // Edit movie when updating
            setEditMovieData(null);  // Clear edit state after submission
          } else {
            addMovie(values);  // Add movie when it's a new movie
          }
        }}
      >
        {formik => {
          const { getFieldProps, isSubmitting, touched, errors } = formik;

          return (
            <Form className="mb-8 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl">


              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editMovieData ? 'Edit Movie' : 'Add a New Movie'}
              </h2>

              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input {...getFieldProps('title')} type="text" id="title" className="border border-gray-300 p-2 w-full rounded-md" />
                {touched.title && errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="genre" className="block text-gray-700">Genre</label>
                <input {...getFieldProps('genre')} type="text" id="genre" className="border border-gray-300 p-2 w-full rounded-md" />
                {touched.genre && errors.genre && <div className="text-red-500 text-sm">{errors.genre}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="release_year" className="block text-gray-700">Release Year</label>
                <input {...getFieldProps('release_year')} type="number" id="release_year" className="border border-gray-300 p-2 w-full rounded-md" />
                {touched.release_year && errors.release_year && <div className="text-red-500 text-sm">{errors.release_year}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Image URL</label>
                <input {...getFieldProps('image')} type="text" id="image" className="border border-gray-300 p-2 w-full rounded-md" />
                {touched.image && errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
              </div>

              <div className="text-center">
                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  {isSubmitting ? (editMovieData ? 'Updating...' : 'Adding...') : (editMovieData ? 'Update Movie' : 'Add Movie')}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Movie List</h2>

      {/* Sort Dropdown */}
      <div className="mb-4 text-center">
        <label htmlFor="sortBy" className="mr-2 text-gray-700">Sort By:</label>
        <select
          id="sortBy"
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="title">Title (A-Z)</option>
          <option value="genre">Genre (A-Z)</option>
          <option value="release_year">Release Year (Earliest to Latest)</option>
        </select>
      </div>

      {sortedMovies.length === 0 ? (
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
            {sortedMovies.map((movie, index) => (
              <tr key={movie.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition duration-200`}>
                <td className="p-4 flex items-center">
                  <img src={movie.image} alt={movie.title} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <span className="text-lg font-semibold">{movie.title}</span>
                </td>
                <td className="p-4">{movie.genre}</td>
                <td className="p-4">{movie.release_year}</td>
                <td className="p-4 flex space-x-4">
                  <button onClick={() => handleEdit(movie)} className="bg-yellow-500 text-white py-2 px-4 rounded-md">
                    Edit
                  </button>
                  <button onClick={() => deleteMovie(movie.id)} className="bg-red-500 text-white py-2 px-4 rounded-md">
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

export default Movies;