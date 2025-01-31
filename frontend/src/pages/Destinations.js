import React, { useState, useEffect } from 'react';
import './Destinations.css'; // Add a CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [tripDetails, setTripDetails] = useState({
        trip_name: '',
        start_date: '',
        end_date: '',
    });

    const token = localStorage.getItem("token"); // Get token from local storage
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/destinations/')
            .then(response => {
                setDestinations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
                setError('Failed to load destinations');
                setLoading(false);
            });
    }, []);

    const openTripModal = (destination) => {
        if (!token) {
            alert('You must be logged in to add destinations to your trip.');
            navigate('/login');
            return;
        }
        setSelectedDestination(destination);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
    };

    const handleAddToTrip = async () => {
        if (!tripDetails.trip_name || !tripDetails.start_date || !tripDetails.end_date) {
            alert("Please fill all trip details.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/trips/trips/",
                {
                    destination_id: selectedDestination.id,
                    trip_name: tripDetails.trip_name,
                    start_date: tripDetails.start_date,
                    end_date: tripDetails.end_date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                alert("Destination added to your trip!");
                setShowModal(false);
                setTripDetails({ trip_name: '', start_date: '', end_date: '' });
            } else {
                alert("Failed to add destination to your trip.");
            }
        } catch (error) {
            console.error("Error adding destination:", error);
            alert("Failed to add destination to your trip. Please try again.");
        }
    };

    if (loading) {
        return <div className="loading">Loading destinations...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="destinations-container">
            <h1>Explore Destinations</h1>
            <div className="cards-container">
                {destinations.length > 0 ? (
                    destinations.map(destination => (
                        <div key={destination.id} className="destination-card">
                            <div className="image-container">
                                <img src={destination.image_url} alt={destination.name} className="destination-image" />
                                <div className="overlay">
                                    <h2>{destination.name}</h2>
                                </div>
                            </div>
                            <div className="card-content">
                                <p>{destination.description}</p>
                                {token ? (
                                    <button className="add-button" onClick={() => openTripModal(destination)}>
                                        Add to My Trip
                                    </button>
                                ) : (
                                    <button className="add-button disabled" disabled>
                                        Login to Add
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No destinations available.</p>
                )}
            </div>

            {/* Trip Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add "{selectedDestination?.name}" to Your Trip</h2>
                        <label>Trip Name:</label>
                        <input
                            type="text"
                            name="trip_name"
                            value={tripDetails.trip_name}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="start_date"
                            value={tripDetails.start_date}
                            onChange={handleInputChange}
                            required
                        />
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="end_date"
                            value={tripDetails.end_date}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="confirm-button" onClick={handleAddToTrip}>
                            Confirm & Add
                        </button>
                        <button className="cancel-button" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Destinations;
