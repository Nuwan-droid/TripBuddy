import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '..//.//..//assets/img/logo.jpeg';

function Navigation() {
    return (
        <nav style={styles.nav}>
            
            <img src= {logo} alt="TripBuddy Logo" style={styles.logo} />

           
            <div style={styles.navLinksContainer}>
                <Link to="/" style={styles.navLink}>Home</Link>
                <Link to="/destinations" style={styles.navLink}>Destinations</Link>
                <Link to="/plans" style={styles.navLink}>Plans</Link>
                <Link to="/admin" style={styles.navLink}>Admin</Link>
                <Link to="/managedestinations" style={styles.navLink}>Manage Destinations</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: 'rgba(6, 120, 105, 0.4)', 
    },
    logo: {
        height: '50px',
    },
    navLinksContainer: {
        display: 'flex',
        gap: '40px',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black', 
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default Navigation;

