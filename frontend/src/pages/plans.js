import React, { useState } from "react";
import "../App.css"; 
import trip1 from "../assets/img/trip/tr1.jpg"; 
import backgroundVideo from "../../../frontend/src/assets/img/vid1.mov"; 

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

    return (
        <div>
            {/* Background Video */}
            <div className="video-container">
                <video autoPlay loop muted className="background-video">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Image and Button */}
            <div className="button-grid">
                <div className="button-image-container">
                    <div className="card-image">
                        <img
                            src={trip1} 
                            alt="Travel 1"
                            onClick={openPopup} 
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
            </div>

            {/* Popup Form */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Travel Planning Form</h2>

                        {/* Form Fields */}
                        <form>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Enter your travel description"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>Time</label>
                                <input type="time" />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="fix-button">
                                    Fix
                                </button>
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="close-button"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomLayout;
