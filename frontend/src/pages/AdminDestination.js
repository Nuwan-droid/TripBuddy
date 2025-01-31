import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../assets/css/managedestinations.css"; // Updated CSS file

function AdminDestination() {
    const [destinations, setDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState({
        name: "",
        description: "",
        location: "",
        image_url: "",
    });

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/destinations/");
            setDestinations(response.data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    const addDestination = async () => {
        if (!newDestination.name || !newDestination.description || !newDestination.location || !newDestination.image_url) {
            alert("All fields are required!");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/destinations/", newDestination);
            setDestinations([...destinations, response.data]);
            setNewDestination({ name: "", location: "", description: "", image_url: "" });
            alert("Destination added successfully!");
        } catch (error) {
            console.error("Error adding destination:", error);
            alert("Failed to add destination.");
        }
    };

    const deleteDestination = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/destinations/${id}/`);
            setDestinations(destinations.filter((destination) => destination.id !== id));
            alert("Destination deleted successfully!");
        } catch (error) {
            console.error("Error deleting destination:", error);
            alert("Failed to delete destination.");
        }
    };

    return (
        <div className="admin-container">
            {/* Add New Destination Card */}
            <div className="add-destination">
                <h2>Add New Destination</h2>
                <input type="text" placeholder="Name" value={newDestination.name} onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })} />
                <textarea placeholder="Description" value={newDestination.description} onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}></textarea>
                <input type="text" placeholder="Location" value={newDestination.location} onChange={(e) => setNewDestination({ ...newDestination, location: e.target.value })} />
                <input type="text" placeholder="Image URL" value={newDestination.image_url} onChange={(e) => setNewDestination({ ...newDestination, image_url: e.target.value })} />
                <button onClick={addDestination}>Add Destination</button>
            </div>
    
            {/* Existing Destinations Section */}
            <div className="existing-destinations">
                <h2>Existing Destinations</h2>
                <div className="destination-list">
                    {destinations.map((destination) => (
                        <div key={destination.id} className="destination-card">
                            <img src={destination.image_url} alt={destination.name} />
                            <h3>{destination.name}</h3>
                            <p>{destination.description}</p>
                            <button onClick={() => deleteDestination(destination.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}    
export default AdminDestination;
