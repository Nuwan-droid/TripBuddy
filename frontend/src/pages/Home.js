import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../../../frontend/src/assets/img/vid1.mov'; // Path to your background video

function Home() {
    return (
        <div style={styles.container}>
            {/* Background Video */}
            <video autoPlay loop muted style={styles.backgroundVideo}>
                <source src={BackgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div style={styles.overlay}>
                <h1 style={styles.title}>Welcome to TripBuddy</h1>
                <p style={styles.description}>
                    Your adventure starts here. Plan your trips with ease.
                </p>
                <div style={styles.buttonContainer}>
                    <Link to="/register" style={styles.button}>Register</Link>
                    <Link to="/login" style={styles.button}>Login</Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional dark overlay for contrast
        zIndex: 1,
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        textDecoration: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '10px 20px',
        borderRadius: '25px',
        transition: 'background-color 0.3s ease',
    },
};

export default Home;
