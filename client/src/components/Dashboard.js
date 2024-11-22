import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from './AppContext'; // Import context

const Dashboard = () => {
    const {
        members,
        workouts,
        exercises,
        goals,
        loading,
        error
    } = useContext(AppContext); // Consume data from AppContext

    // State to keep track of the selected member
    const [selectedMember, setSelectedMember] = useState(null); // Start with null to avoid initial fetch error

    // Set the default selected member after the members are loaded
    useEffect(() => {
        if (members.length > 0) {
            setSelectedMember(members[0]); // Set initial member to the first member
        }
    }, [members]); // Only set after members are loaded

    // Display loading state
    if (loading) {
        return <div className="text-center text-xl font-semibold text-gray-500">Loading...</div>;
    }

    // Display error state
    if (error) {
        return <div className="text-center text-xl font-semibold text-red-500">{error}</div>;
    }

    // Handle member change
    const handleMemberChange = (event) => {
        const memberId = event.target.value;
        const newSelectedMember = members.find(member => member.id === memberId);
        setSelectedMember(newSelectedMember);
    };

    if (!selectedMember) {
        return (
            <div className="text-center text-xl font-semibold text-gray-500">
                Select a member to view their profile.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>

            {/* Member Selection Dropdown */}
            <div className="mb-6">
                <label htmlFor="member-select" className="text-lg font-semibold text-gray-800 mr-2">Select Member:</label>
                <select
                    id="member-select"
                    value={selectedMember.id} // Value is the member's ID
                    onChange={handleMemberChange}
                    className="p-2 border border-gray-300 rounded"
                >
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Profile Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedMember.name}'s Profile</h2>
                <p className="text-lg text-gray-700">Age: {selectedMember.age}</p>
                <p className="text-lg text-gray-700">Height: {selectedMember.height} cm</p>
                <p className="text-lg text-gray-700">Weight: {selectedMember.weight} kg</p>
            </div>

            {/* Goals Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Goals</h2>
                {goals.length === 0 ? (
                    <p className="text-lg text-gray-500">No goals set yet!</p>
                ) : (
                    goals.map((goal) => (
                        <div key={goal.id} className="border-b border-gray-200 py-4">
                            <p className="text-lg text-gray-700">Goal: {goal.goal_type}</p>
                            <p className="text-md text-gray-600">Target: {goal.target_value}</p>
                            <p className="text-md text-gray-600">Current: {goal.current_value}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Workouts Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Workouts</h2>
                {workouts.length === 0 ? (
                    <p className="text-lg text-gray-500">No workouts scheduled yet!</p>
                ) : (
                    workouts.map((workout) => (
                        <div key={workout.id} className="border-b border-gray-200 py-4">
                            <p className="text-lg text-gray-700">{workout.name}</p>
                            <p className="text-md text-gray-600">{workout.description}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Exercises Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exercises</h2>
                {exercises.length === 0 ? (
                    <p className="text-lg text-gray-500">No exercises recorded yet!</p>
                ) : (
                    exercises.map((exercise) => (
                        <div key={exercise.id} className="border-b border-gray-200 py-4">
                            <p className="text-lg text-gray-700">{exercise.name}</p>
                            <p className="text-md text-gray-600">Sets: {exercise.sets}</p>
                            <p className="text-md text-gray-600">Reps: {exercise.reps}</p>
                            <p className="text-md text-gray-600">Weight: {exercise.weight} kg</p>
                            <p className="text-md text-gray-600">Duration: {exercise.duration} min</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
