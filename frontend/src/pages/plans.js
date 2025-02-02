import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PlusCircle } from "lucide-react";
import "../assets/css/activities.css";
import BackgroundVideo from "../assets/img/vid1.mov";

function Plans() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        description: "",
        activity_date: "",
        activity_time: "",
    });

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            Swal.fire("Session Expired", "Please log in again.", "warning").then(() => {
                navigate("/login");
            });
            return;
        }
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/trips/activities/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setActivities(response.data);
            setLoading(false);
        } catch (error) {
            Swal.fire("Error", "Failed to fetch activities. Please try again.", "error");
            setLoading(false);
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
            trip: 4, // You might want to change this dynamically
        };

        try {
            if (editMode) {
                await axios.put(
                    `http://127.0.0.1:8000/trips/activities/${formData.id}/`,
                    requestPayload,
                    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
                );
                Swal.fire("Success", "Activity updated successfully!", "success");
            } else {
                await axios.post("http://127.0.0.1:8000/trips/activities/", requestPayload, {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                });
                Swal.fire("Success", "Activity added successfully!", "success");
            }
            setShowForm(false);
            setEditMode(false);
            setFormData({ id: null, description: "", activity_date: "", activity_time: "" });
            fetchActivities();
        } catch (error) {
            Swal.fire("Error", "Failed to save activity. Please try again.", "error");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/trips/activities/${id}/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    Swal.fire("Deleted!", "Activity has been deleted.", "success");
                    fetchActivities();
                } catch (error) {
                    Swal.fire("Error", "Failed to delete activity. Please try again.", "error");
                }
            }
        });
    };

    const handleEdit = (activity) => {
        setFormData({
            id: activity.id,
            description: activity.description,
            activity_date: activity.activity_date,
            activity_time: activity.activity_time,
        });
        setEditMode(true);
        setShowForm(true);
    };

    useEffect(() => {
        if (editMode && showForm) {
            document.getElementById("activity-form").scrollIntoView({ behavior: "smooth" });
        }
    }, [editMode, showForm]);

    if (loading) {
        return <p>Loading activities...</p>;
    }

    return (
        <div className="activities-container">
            <video autoPlay loop muted className="background-video">
                <source src={BackgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content-overlay">
                <h1 className="activities-title">Trip Activities</h1>

                {activities.length === 0 ? (
                    <p>No activities found.</p>
                ) : (
                    <div className="activities-grid">
                        {activities.map((activity) => (
                            <div key={activity.id} className="activity-card">
                                <h3>{activity.description}</h3>
                                <p><strong>Date:</strong> {new Date(activity.activity_date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {activity.activity_time}</p>
                                <div className="activity-buttons">
                                    <button onClick={() => handleEdit(activity)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(activity.id)} className="delete-button">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="add-activity-card" onClick={() => { 
                    setShowForm(true); 
                    setEditMode(false); 
                    setFormData({ id: null, description: "", activity_date: "", activity_time: "" }); 
                }}>
                    <PlusCircle size={24} color="#4caf50" />
                </div>

                {showForm && (
                    <div className="popup-overlay" id="activity-form">
                        <div className="popup-content">
                            <h2>{editMode ? "Edit Activity" : "Add New Activity"}</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Description:
                                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Activity Date:
                                    <input type="date" name="activity_date" value={formData.activity_date} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Activity Time:
                                    <input type="time" name="activity_time" value={formData.activity_time} onChange={handleInputChange} required />
                                </label>
                                <button type="submit">{editMode ? "Update" : "Submit"}</button>
                                <button type="button" className="close-button" onClick={() => setShowForm(false)}>Close</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Plans;
