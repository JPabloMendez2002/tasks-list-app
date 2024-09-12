import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import TaskPage from './components/TasksPage/TaskPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import HomePage from './components/HomePage'; 

function App() {
    const { tokenUser } = useSelector(state => state.stateProfile);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={tokenUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={tokenUser ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/tasks" element={tokenUser ? <TaskPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={tokenUser ? "/home" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
