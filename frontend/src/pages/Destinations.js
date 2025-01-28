import React, { useState, useEffect } from 'react';
import './Destinations.css'; // Add a CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token"); // Get token from local storage
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Fetch destination data from the backend API
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

    const handleAddToTrip = (destinationId) => {
        if (!token) {
            // If the user is not logged in, redirect them to the login page with an error message
            alert('You must be logged in to add destinations to your trip.');
            navigate('/login');
            return;
        }

        // If the user is logged in, proceed with adding the destination to their trip
        axios.post('http://127.0.0.1:8000/trips/add_destination/', { 
            destination_id: destinationId 
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in header
            }
        })
        .then(response => {
            alert('Destination added to your trip!');
        })
        .catch(error => {
            console.error('Error adding destination:', error);
            alert('Failed to add destination to your trip');
        });
    };

    if (loading) {
        return <div>Loading destinations...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="destinations-container">
            <h1>Destinations</h1>
            <div className="cards-container">
                {destinations.length > 0 ? (
                    destinations.map(destination => (
                        <div key={destination.id} className="destination-card">
                            <img src={destination.image_url} alt={destination.name} className="destination-image"/>
                            <h2>{destination.name}</h2>
                            <p>{destination.description}</p>
                            {token ? (
                                <button onClick={() => handleAddToTrip(destination.id)}>Add to My Trip</button>
                            ) : (
                                <button disabled>Login to add to my trip</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No destinations available.</p>
                )}
            </div>
        </div>
    );
}

export default Destinations;
