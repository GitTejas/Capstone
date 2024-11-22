import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './NavBar';

// Import your new workout components
import MembersList from './MembersList';
import WorkoutList from './WorkoutList';
import ExerciseList from './ExerciseList';
import GoalList from './GoalList';
import Dashboard from './Dashboard';
import NewForm from './NewForm';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 py-4">
          <Routes>
            {/* Updated routes for your new data models */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MembersList />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/goals" element={<GoalList />} />

            {/* Updated new form route */}
            <Route path="/newform" element={<NewForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
