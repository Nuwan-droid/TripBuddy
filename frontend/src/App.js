import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbars/Navigation.js'; // Adjust path if needed
import Destinations from './pages/Destinations.js';
import Home from './pages/Home.js';
import Admin from 'layouts/Admin.js';
import ManageDestinations from './pages/AdminDestination.js';
import Login from './components/LoginRegister/LoginRegister.jsx';
import Dashboard from 'views/Dashboard.js';
function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/managedestinations" element={<ManageDestinations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
