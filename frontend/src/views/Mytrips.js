import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/mytrips.css";
import { useNavigate } from "react-router-dom";

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null); // State for selected trip details
    const [destinationData, setDestinationData] = useState({}); // Object to store destination data (name and image)
    const [loading, setLoading] = useState(true); // Loading state
    const token = localStorage.getItem("token"); // Get token from local storage

    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/trips/trips/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTrips(response.data);

            // Fetch destination names and image URLs
            const destinationData = await fetchDestinationData(response.data);
            setDestinationData(destinationData);
        } catch (error) {
            console.error("Error fetching trips:", error);
            alert("Failed to fetch trips. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDestinationData = async (trips) => {
        const destinationIds = [...new Set(trips.map((trip) => trip.destination_id))];
        const destinationData = {};

        try {
            for (const destinationId of destinationIds) {
                const response = await axios.get(`http://127.0.0.1:8000/api/destinations/${destinationId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                destinationData[destinationId] = {
                    name: response.data.name, // Storing destination name
                    image_url: response.data.image_url, // Storing destination image URL
                };
            }
        } catch (error) {
            console.error("Error fetching destination data:", error);
        }

        return destinationData;
    };

    const handleCardClick = (trip) => {
        setSelectedTrip(trip);
    };

    const closeModal = () => {
        setSelectedTrip(null);
    };

    const handleEditClick = (id) => {
        // Using navigate() for redirecting to the edit trip page
        navigate(`/edittrip/${id}`);
    };

    if (loading) {
        return <p>Loading your trips...</p>;
    }

    return (
        <div>
            <h1>My Trips</h1>
            <div className="card-container">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="trip-card"
                        onClick={() => handleCardClick(trip)}
                    >
                        <h3>{trip.trip_name}</h3>
                        <p>Start Date: {trip.start_date}</p>
                        <p>End Date: {trip.end_date}</p>
                        {destinationData[trip.destination_id] ? (
                            <>
                                <h4 className="destination-name">{destinationData[trip.destination_id].name}</h4> {/* Display the destination name in blue */}
                                <img
                                    src={destinationData[trip.destination_id].image_url}
                                    alt="Destination"
                                    className="destination-image"
                                />
                            </>
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {selectedTrip && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <h2>{selectedTrip.trip_name}</h2>
                        <p><strong>Destination:</strong> <span className="destination-name">{destinationData[selectedTrip.destination_id]?.name}</span></p> {/* Show destination name in blue */}
                        <p><strong>Start Date:</strong> {selectedTrip.start_date}</p>
                        <p><strong>End Date:</strong> {selectedTrip.end_date}</p>
                        <p><strong>Total Budget:</strong> {selectedTrip.total_budget}</p>
                        <p><strong>Created At:</strong> {selectedTrip.created_at}</p>
                        <p><strong>Updated At:</strong> {selectedTrip.updated_at}</p>
                        {destinationData[selectedTrip.destination_id] && (
                            <img
                                src={destinationData[selectedTrip.destination_id].image_url}
                                alt="Destination"
                                className="destination-image-modal" // Apply this class for small image
                            />
                        )}
                        {/* Edit Button */}
                        <button className="edit-btn" onClick={() => handleEditClick(selectedTrip.id)}>
                            Edit Trip Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTrips;
