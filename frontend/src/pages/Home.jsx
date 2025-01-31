import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../../../frontend/src/assets/img/vid1.mov';
import { Container } from 'reactstrap';

function Home() {
    return (
        <div style={styles.pageContainer}>
            {/* Main Content */}
            <div style={styles.content}>
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

            <footer style={styles.footer}>
                <Container fluid>
                    <nav>
                        <ul style={styles.footerNav}>
                            <li>
                                <a
                                    href="https://www.creative-tim.com?ref=nudr-footer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.footerLink}
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://presentation.creative-tim.com?ref=nudr-footer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.footerLink}
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://blog.creative-tim.com?ref=nudr-footer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.footerLink}
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div style={styles.copyright}>
                        &copy; {1900 + new Date().getYear()}, Designed by{" "}
                        <a
                            href="https://www.invisionapp.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.footerLink}
                        >
                            TripBuddy
                        </a>
                    </div>
                </Container>
            </footer>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
        position: 'relative',
        width: '100%',
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    footer: {
        backgroundColor: '#0a192f',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        zIndex: 2,
    },
    footerNav: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '10px',
    },
    footerLink: {
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    },
    copyright: {
        fontSize: '14px',
        color: '#ccc',
    },
};

export default Home;