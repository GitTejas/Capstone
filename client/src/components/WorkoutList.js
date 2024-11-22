import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

const WorkoutList = () => {
  const { workouts, loading } = useContext(AppContext);

  // While the data is loading, show a loading message
  if (loading) {
    return <p className="text-center text-gray-500">Loading workouts...</p>;
  }

  // Check if workouts is an array and if it contains any workouts
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return <p className="text-center text-gray-600">No workouts available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Workout List</h2>
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li
            key={workout.id} // Assuming each workout has a unique `id`
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Link
              to={`/workouts/${workout.id}`} // Adjusted to point to workout detail route
              className="text-blue-500 hover:text-blue-700"
            >
              <p className="font-medium text-gray-800">Workout: {workout.name}</p>
              <p className="text-sm text-gray-600">Duration: {workout.duration} mins</p>
              <p className="text-sm text-gray-600">Intensity: {workout.intensity}</p>
              <p className="text-sm text-gray-600">Type: {workout.type}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
