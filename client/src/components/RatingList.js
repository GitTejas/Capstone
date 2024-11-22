// src/components/RatingsList.js
import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

const RatingsList = () => {
  const { ratings, loading } = useContext(AppContext);

  // While the data is loading, show a loading message
  if (loading) {
    return <p className="text-center text-gray-500">Loading ratings...</p>;
  }

  // Check if ratings is an array and if it contains any ratings
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return <p className="text-center text-gray-600">No ratings available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ratings List</h2>
      <ul className="space-y-4">
        {ratings.map((rating) => (
          <li key={rating.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Link to={`/ratings/${rating.id}`} className="text-blue-500 hover:text-blue-700">
              <p className="font-medium text-gray-800">Review: {rating.review}</p>
              <p className="text-sm text-gray-600">Rating: {rating.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingsList;
