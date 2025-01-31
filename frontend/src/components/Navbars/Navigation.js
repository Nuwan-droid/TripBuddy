import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '..//.//..//assets/img/logo.png';
import './Navigation.css'; // Import a CSS file for better styling

function Navigation() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="nav">
            {/* Logo */}
            <div className="logo-container">
                <img src={logo} alt="TripBuddy Logo" className="logo" />
            </div>

            {/* Desktop Navigation Links */}
            <div className={`nav-links-container ${isMobileMenuOpen ? 'open' : ''}`}>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/destinations" className="nav-link">Destinations</Link>
                <Link to="/plans" className="nav-link">Plans</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>
        </nav>
    );
}

export default Navigation;