import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/activities.css"; // Ensure CSS is applied

function Plans() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // State for form visibility
    const [formData, setFormData] = useState({
        description: "",
        activity_date: "",
        activity_time: "",
    });
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
            const response = await axios.get("http://127.0.0.1:8000/trips/activities/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response Data:", response.data);
            setActivities(response.data);
            setLoading(false); // ✅ Ensure loading state is updated
        } catch (error) {
            console.error("Error fetching activities:", error);
            alert("Failed to fetch activities. Please try again.");
            setLoading(false); // ✅ Ensure loading state is updated even on error
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestPayload = {
            description: formData.description,
            activity_date: formData.activity_date,
            activity_time: formData.activity_time,
            trip: 4,  // Send trip ID directly as a number
        };
    
        console.log("Request Payload:", requestPayload);
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/trips/activities/",
                requestPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("Activity added successfully!");
            setShowForm(false); // Close form
            fetchActivities(); // Fetch updated list
        } catch (error) {
            console.error("Error adding activity:", error.response ? error.response.data : error.message);
            alert("Failed to add activity. Please try again.");
        }
    };
    
    
    
    

    if (loading) {
        return <p>Loading activities...</p>;
    }

    return (
        <div className="activities-container">
            <h1 className="activities-title">Trip Activities</h1>

            {/* Add Activity Button */}
            <div className="add-activity-card" onClick={() => setShowForm(true)}>
                <h3>+</h3>
                <p>Add Activity</p>
            </div>

            {/* Form Popup */}
            {showForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Add New Activity</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Activity Date:
                                <input
                                    type="date"
                                    name="activity_date"
                                    value={formData.activity_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Activity Time:
                                <input
                                    type="time"
                                    name="activity_time"
                                    value={formData.activity_time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">Submit</button>
                            <button
                                type="button"
                                className="close-button"
                                onClick={() => setShowForm(false)}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {activities.length === 0 ? (
                <p>No activities found.</p>
            ) : (
                <div className="activities-grid">
                    {activities.map((activity) => (
                        <div key={activity.id} className="activity-card">
                            <h3>{activity.description}</h3>
                            <p><strong>Date:</strong> {new Date(activity.activity_date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {new Date(`1970-01-01T${activity.activity_time}Z`).toLocaleTimeString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Plans;
