import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/edittrip.css";

function EditTrip() {
    const { id } = useParams(); // Get trip ID from URL
    const navigate = useNavigate(); // Navigation hook

    const [trip, setTrip] = useState({
        trip_name: "",
        start_date: "",
        end_date: "",
        destination_id: "",
        total_budget: "",
    });

    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTrip();
        fetchDestinations();
    }, []);

    const fetchTrip = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/trips/trips/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTrip(response.data);
            setLoading(false); // Set loading to false after fetching data
        } catch (error) {
            console.error("Error fetching trip:", error);
            setError("Failed to fetch trip details.");
            setLoading(false);
        }
    };

    const fetchDestinations = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/destinations/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDestinations(response.data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
            setError("Failed to fetch destinations.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({
            ...prevTrip,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://127.0.0.1:8000/trips/trips/${id}/`,
                trip,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Trip updated successfully!");
            navigate("/mytrips"); // Redirect to My Trips after successful update
        } catch (error) {
            console.error("Error updating trip:", error);
            setError("Failed to update trip.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Edit Trip Details</h1>
            {error && <p className="error">{error}</p>}
            <form className="edit-trip-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="trip_name">Trip Name</label>
                    <input
                        type="text"
                        id="trip_name"
                        name="trip_name"
                        value={trip.trip_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">Start Date</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={trip.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">End Date</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={trip.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="destination_id">Destination</label>
                    <select
                        id="destination_id"
                        name="destination_id"
                        value={trip.destination_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a destination</option>
                        {destinations.map((destination) => (
                            <option key={destination.id} value={destination.id}>
                                {destination.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="total_budget">Total Budget</label>
                    <input
                        type="number"
                        id="total_budget"
                        name="total_budget"
                        value={trip.total_budget}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditTrip;
