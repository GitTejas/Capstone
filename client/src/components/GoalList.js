import React, { useContext } from "react";
import { AppContext } from "./AppContext";

function GoalList() {
  const { goals, loading } = useContext(AppContext);

  // If data is still loading, show loading message
  if (loading) {
    return <p>Loading goals...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Goal List</h2>
      {goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Goal Type</th>
              <th className="p-3 text-left">Target Value</th>
              <th className="p-3 text-left">Current Value</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal, index) => (
              <tr
                key={goal.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white hover:bg-gray-200"}
              >
                <td className="p-3">{goal.goal_type}</td>
                <td className="p-3">{goal.target_value}</td>
                <td className="p-3">{goal.current_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GoalList;
