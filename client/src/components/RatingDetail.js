// // src/components/RatingDetail.js
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "./AppContext"

// const RatingDetail = () => {
//   const { id } = useParams();
//   const { ratings } = useContext(AppContext);
//   const [rating, setRating] = useState(null);

//   useEffect(() => {
//     const selectedRating = ratings.find((r) => r.id === parseInt(id));
//     setRating(selectedRating);
//   }, [id, ratings]);

//   if (!rating) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>{rating.movieTitle}</h2>
//       <p>Rating: {rating.score}</p>
//       <p>Review: {rating.review}</p>
//     </div>
//   );
// };

// export default RatingDetail;
