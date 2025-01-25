import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../assets/css/admin.css'; // Create this for styling

function AdminDestination() {
    const [destinations, setDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState({
        name: '',
        description: '',
        image_url: '',
    });

    // Fetch destinations
    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/destinations/');
            setDestinations(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    // Add a new destination
    const addDestination = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/destinations/', newDestination);
            setDestinations([...destinations, response.data]);
            setNewDestination({ name: '', description: '', image_url: '' });
        } catch (error) {
            console.error('Error adding destination:', error);
        }
    };

    // Delete a destination
    const deleteDestination = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/destinations/${id}/`);
            setDestinations(destinations.filter(destination => destination.id !== id));
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="add-destination-form">
                <h2>Add New Destination</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newDestination.name}
                    onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newDestination.description}
                    onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
                ></textarea>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newDestination.image_url}
                    onChange={(e) => setNewDestination({ ...newDestination, image_url: e.target.value })}
                />
                <button onClick={addDestination}>Add Destination</button>
            </div>

            <h2>Existing Destinations</h2>
            <div className="destination-list">
                {destinations.map((destination) => (
                    <div key={destination.id} className="destination-card">
                        <h3>{destination.name}</h3>
                        <p>{destination.description}</p>
                        <img src={destination.image_url} alt={destination.name} />
                        <button onClick={() => deleteDestination(destination.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDestination;
