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
                <Link to="/admin" style={styles.link}>Admin</Link>
                <Link to="/managedestinations" style={styles.link}>Manage Destinations</Link>
                <Link to="/login" style={styles.link}>Login</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red', // Navy Blue
        padding: '10px 20px',
    },
    logo: {
        height: '40px',
    },
    links: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

export default Navigation;