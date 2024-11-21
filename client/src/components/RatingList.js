// src/components/RatingsList.js
import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext"
import { Link } from "react-router-dom";

const RatingsList = () => {
    const { ratings, loading } = useContext(AppContext);
  
    // While the data is loading, show a loading message
    if (loading) {
      return <p>Loading ratings...</p>;
    }
  
    // Check if ratings is an array and if it contains any ratings
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return <p>No ratings available.</p>;
    }
  
    return (
      <div>
        <h2>Ratings List</h2>
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <Link to={`/ratings/${rating.id}`}>
                {rating.review} - Rating: {rating.score}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default RatingsList;
