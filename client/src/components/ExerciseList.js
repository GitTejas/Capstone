import React, { useContext } from "react";
import { AppContext } from "./AppContext";

function ExerciseList() {
  const { exercises, loading } = useContext(AppContext);

  // While data is loading, show a loading message
  if (loading) {
    return <p className="text-center text-gray-500">Loading exercises...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercise List</h2>
      {exercises.length === 0 ? (
        <p className="text-center text-gray-600">No exercises found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Exercise Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Duration (min)
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Sets
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Reps
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">
                Weight (kg)
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr
                key={exercise.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border border-gray-200 px-4 py-2">{exercise.name}</td>
                <td className="border border-gray-200 px-4 py-2">{exercise.duration}</td>
                <td className="border border-gray-200 px-4 py-2">{exercise.sets}</td>
                <td className="border border-gray-200 px-4 py-2">{exercise.reps}</td>
                <td className="border border-gray-200 px-4 py-2">{exercise.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExerciseList;
