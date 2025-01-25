import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/tripbuddy-logo.svg';

function Navigation() {
    return (
        <nav style={styles.nav}>
        <img src={Logo} alt="TripBuddy Logo" style={styles.logo} />
        <div style={styles.links}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/destinations" style={styles.link}>Destinations</Link>
            <Link to="/managedestinations" style={styles.link}>Plans</Link>
        </div>
    </nav>
    
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(247, 245, 245, 0.3)', // Semi-transparent background
        backdropFilter: 'blur(10px)', // Glass-like effect
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    },
    logo: {
        height: '40px',
        position: 'absolute',
        left: '20px', // Distance from the left side
    },
    links: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
        textAlign: 'center'
    },
};


export default Navigation;
