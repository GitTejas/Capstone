import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Reviews = () => {
  const { ratings, loading, movies, users, setRatings, addRating } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);


  const validationSchema = Yup.object().shape({
    movieId: Yup.string()
      .required("You must select a movie"), // Enforces movie selection
    userId: Yup.string()
      .required("You must select a user"), // Enforces user selection
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    review: Yup.string()
      .required("Review is required")
      .min(2, "Review must be more than 1 character")
      .max(500, "Review cannot exceed 500 characters"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      movieId: "",
      userId: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newRating = {
        movieId: parseInt(values.movieId), 
        userId: parseInt(values.userId), 
        rating: parseInt(values.rating),
        review: values.review,
      };
  
      addRating(newRating);
  
      formik.resetForm();
      setShowForm(false); 
    },
  });
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading ratings...</p>;
  }

  if (!Array.isArray(ratings) || ratings.length === 0) {
    return <p className="text-center text-gray-600">No ratings available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews and Ratings</h2>

      {/* Add New Rating Form Toggle */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
      >
        {showForm ? "Cancel" : "Add a New Review"}
      </button>

      {/* Add/Edit Rating Form */}
      {showForm && (
        <form onSubmit={formik.handleSubmit} className="space-y-4 mb-8 bg-blue-200 p-6 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div>
            <label htmlFor="movieId" className="block text-sm font-medium text-gray-700">Movie</label>
            <select
              id="movieId"
              name="movieId"
              onChange={formik.handleChange}
              value={formik.values.movieId}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
            {formik.errors.movieId && formik.touched.movieId && (
              <div className="text-red-500 text-sm">{formik.errors.movieId}</div>
            )}
          </div>

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User</label>
            <select
              id="userId"
              name="userId"
              onChange={formik.handleChange}
              value={formik.values.userId}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {formik.errors.userId && formik.touched.userId && (
              <div className="text-red-500 text-sm">{formik.errors.userId}</div>
            )}
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
            <input
              id="rating"
              name="rating"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.rating}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              min="1"
              max="5"
            />
            {formik.errors.rating && formik.touched.rating && (
              <div className="text-red-500 text-sm">{formik.errors.rating}</div>
            )}
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
            <textarea
              id="review"
              name="review"
              onChange={formik.handleChange}
              value={formik.values.review}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              rows="4"
            />
            {formik.errors.review && formik.touched.review && (
              <div className="text-red-500 text-sm">{formik.errors.review}</div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {"Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Display Existing Ratings */}
      <ul className="space-y-6 mt-8">
        {ratings.map((rating) => (
          <li key={rating.id} className="p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-300 border-2 border-transparent rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-900 mb-1">{rating.movie.title}</p>
                <p className="text-sm text-gray-700 italic">Rated by: {rating.user.name}</p>
              </div>

              <div className="flex items-center space-x-1">
                <span className="text-lg font-semibold text-yellow-400">
                  {"★".repeat(rating.rating)}
                </span>
                <p className="text-sm text-gray-600">({rating.rating}/5)</p>
              </div>
            </div>

            <p className="text-lg font-medium text-gray-800 mb-2">{rating.review}</p>

            <div className="text-sm text-gray-500 flex justify-between items-center">
              <p>Rating Date: {new Date(rating.created_at).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;