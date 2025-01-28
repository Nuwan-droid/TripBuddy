import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/mytrips.css";

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null); // State for selected trip details
    const [destinationImages, setDestinationImages] = useState({}); // State for storing destination images
    const token = localStorage.getItem("token"); // Get token from local storage

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/trips/trips/", {
                headers: { Authorization: `Bearer ${token}` }, // Send token in header
            });
            setTrips(response.data);

            // Fetch destination image URLs
            const destinationData = await fetchDestinationImages(response.data);
            setDestinationImages(destinationData);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    const fetchDestinationImages = async (trips) => {
        const destinationIds = [...new Set(trips.map((trip) => trip.destination_id))];
        const destinationImages = {};

        try {
            // Fetch destination data for each unique destination_id
            for (const destinationId of destinationIds) {
                const response = await axios.get(`http://127.0.0.1:8000/api/destinations/${destinationId}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in header
                });
                destinationImages[destinationId] = response.data.image_url;
            }
        } catch (error) {
            console.error("Error fetching destination images:", error);
        }

        return destinationImages;
    };

    const handleCardClick = (trip) => {
        setSelectedTrip(trip); // Set selected trip to show in the modal
    };

    const closeModal = () => {
        setSelectedTrip(null); // Close the modal by setting selectedTrip to null
    };

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
                        {destinationImages[trip.destination_id] && (
                            <img
                                src={destinationImages[trip.destination_id]}
                                alt="Destination"
                                className="destination-image"
                            />
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
                        <p><strong>Destination ID:</strong> {selectedTrip.destination_id}</p>
                        <p><strong>Start Date:</strong> {selectedTrip.start_date}</p>
                        <p><strong>End Date:</strong> {selectedTrip.end_date}</p>
                        <p><strong>Total Budget:</strong> {selectedTrip.total_budget}</p>
                        <p><strong>Created At:</strong> {selectedTrip.created_at}</p>
                        <p><strong>Updated At:</strong> {selectedTrip.updated_at}</p>
                        {destinationImages[selectedTrip.destination_id] && (
                            <img
                                src={destinationImages[selectedTrip.destination_id]}
                                alt="Destination"
                                className="destination-image-modal"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTrips;
