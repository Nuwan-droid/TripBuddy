import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/activities.css"; // Ensure CSS is applied

function Plans() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        if (!token) {
            console.error("No token found. User must log in.");
            alert("Session expired! Please log in again.");
            navigate("/login");
            return;
        }

        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/activities/", {  // ✅ Correct endpoint
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response Data:", response.data);  // ✅ Debug response
            setActivities(response.data);
        } catch (error) {
            console.error("Error fetching activities:", error);
            alert("Failed to fetch activities. Please try again.");
        }
    };


    if (loading) {
        return <p>Loading activities...</p>;
    }

    return (
        <div className="activities-container">
            <h1>Trip Activities</h1>
            {activities.length === 0 ? (
                <p>No activities found.</p>
            ) : (
                <div className="activities-list">
                    {activities.map((activity) => (
                        <div key={activity.id} className="activity-card">
                            <h3>{activity.name}</h3>
                            <p><strong>Description:</strong> {activity.description}</p>
                            <p><strong>Date:</strong> {activity.activity_date}</p>
                            <p><strong>Time:</strong> {activity.activity_time}</p>
                            <p><strong>Created At:</strong> {new Date(activity.created_at).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(activity.updated_at).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Plans;
