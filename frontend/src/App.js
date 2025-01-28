import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbars/Navigation'; // Adjust path if needed
import Destinations from './pages/Destinations';
import Home from './pages/Home';
import Admin from './layouts/Admin';
import plans from './pages/plans';
import ManageDestinations from './pages/AdminDestination';

function App() {
    return (
        <Router>
            <div className="App">
                {/* Navigation Component (Navbar) */}
                <Navigation />

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/managedestinations" element={<ManageDestinations />} />
                    <Route path="/plans" element={<plans />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
