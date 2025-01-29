import React, { useState } from "react";
import "../App.css"; // Import the CSS file

function CustomLayout() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to open the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const images = [
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        require("../assets/img/trip/trip1.jpg"),
        
    ];

    return (
        <div className="container">
            {/* Buttons and Circular Images */}
            <div className="button-grid">
                {images.map((image, index) => (
                    <div key={index} className="button-image-container">
                        {/* Circular Image */}
                        <div className="card-image">
                            <img src={image} alt={`Trip ${index + 1}`} />
                        </div>
                        <button onClick={openPopup} className="custom-button">
                            Click here
                        </button>
                    </div>
                ))}
            </div>

            {/* Popup Form */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Hotel Booking Form</h2>

                        {/* Form Fields */}
                        <form>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" />
                            </div>
                            <div className="form-group">
                                <label>Hotel Name</label>
                                <input type="text" placeholder="Enter hotel name" />
                            </div>
                            <div className="form-group">
                                <label>Room Type</label>
                                <select>
                                    <option value="single">Single Room</option>
                                    <option value="double">Double Room</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Guests</label>
                                <input type="number" placeholder="Number of guests" />
                            </div>
                        </form>

                        {/* Close Button */}
                        <button onClick={closePopup} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomLayout;
