import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/dashboard.css"; // Optional CSS for styling

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
            <h1>Welcome to the Dashboard</h1>
            <p>This is the main page for logged-in users.</p>

            <div className="cards-container">
                {/* My Trips Card */}
                <div className="card" onClick={handleMyTripsClick}>
                    <h2>My Trips</h2>
                    <p>View and manage your trips here.</p>
                </div>
            </div>

            <div className="actions">
                <button className="logout-button" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
