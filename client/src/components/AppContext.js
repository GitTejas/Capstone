import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
    // State for various data categories
    const [members, setMembers] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state for better handling

    useEffect(() => {
        // Fetch all initial workout-related data
        Promise.all([
            fetch('/members').then((res) => res.json()),
            fetch('/workouts').then((res) => res.json()),
            fetch('/exercises').then((res) => res.json()),
            fetch('/goals').then((res) => res.json())
        ])
            .then(([membersData, workoutsData, exercisesData, goalsData]) => {
                setMembers(membersData);
                setWorkouts(workoutsData);
                setExercises(exercisesData);
                setGoals(goalsData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to load data.'); // Set error message
                setLoading(false);
            });
    }, []);

    // Functions to add new items to the state
    const addMember = (newMember) => {
        setMembers((prevMembers) => [...prevMembers, newMember]);
    };

    const addWorkout = (newWorkout) => {
        setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    };

    const addExercise = (newExercise) => {
        setExercises((prevExercises) => [...prevExercises, newExercise]);
    };

    const addGoal = (newGoal) => {
        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    return (
        <AppContext.Provider value={{
            members,
            workouts,
            exercises,
            goals,
            loading,
            error,  // Provide error state for UI feedback
            addMember,
            addWorkout,
            addExercise,
            addGoal
        }}>
            {children}
        </AppContext.Provider>
    );
};
