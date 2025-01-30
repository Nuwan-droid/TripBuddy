import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbars/Navigation.js'; // Adjust path if needed
import Destinations from './pages/Destinations.js';
import Home from './pages/Home.jsx';
import AdminDashboard from './views/AdminDashboard.jsx';
import ManageDestinations from './pages/AdminDestination.js';
import Login from './components/LoginRegister/LoginRegister.jsx';
import Dashboard from 'views/Dashboard.js';
import Plans from './pages/plans.js';
import MyTrips from 'views/Mytrips.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/managedestinations" element={<ManageDestinations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/mytrips" element={<MyTrips />} />
                </Routes>
            </div>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

        </Router>
    );
}

export default App;