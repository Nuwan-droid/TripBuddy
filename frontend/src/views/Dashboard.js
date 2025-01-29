import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css"; // Import the updated CSS
import backgroundVideo from "../../../frontend/src/assets/img/vid1.mov"; // Import the background video

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        localStorage.clear(); // Example: clear localStorage
        sessionStorage.clear(); // Example: clear sessionStorage
        navigate("/"); // Redirect to the login page
    };

    const handleMyTripsClick = () => {
        navigate("/mytrips"); // Redirect to the My Trips page
    };

    return (
        <div className="dashboard-container">
            {/* Background Video */}
            <video autoPlay loop muted className="video-background">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for better text visibility */}
            <div className="overlay"></div>

            {/* Dashboard Content */}
            <h1>Welcome to the Dashboard</h1>
            <p>This is the main page for logged-in users.</p>

            {/* Cards Container */}
            <div className="cards-container">
                {/* My Trips Card */}
                <div className="card" onClick={handleMyTripsClick}>
                    <h2>My Trips</h2>
                    <p>View and manage your trips here.</p>
                </div>
            </div>

            {/* Logout Button */}
            <div className="actions">
                <button className="logout-button" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Dashboard;