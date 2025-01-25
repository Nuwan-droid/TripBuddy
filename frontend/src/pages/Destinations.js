import React, { useState, useEffect } from 'react';
import './Destinations.css'; // Add a CSS file for styling
import axios from 'axios';

function Destinations() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch destination data from the backend API
        axios.get('http://127.0.0.1:8000/api/destinations/')
            .then(response => {
                setDestinations(response.data);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });
    }, []);

    return (
        <div className="destinations-container">
            <h1>Destinations</h1>
            <div className="cards-container">
                {destinations.map(destination => (
                    <div key={destination.id} className="destination-card">
                        <img src={destination.image_url} alt={destination.name} className="destination-image"/>
                        <h2>{destination.name}</h2>
                        <p>{destination.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Destinations;
