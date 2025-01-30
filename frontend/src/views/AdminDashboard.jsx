import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const stats = {
        totalUsers: 1250,
        activeItineraries: 456,
        totalDestinations: 89,
        pendingApprovals: 12
    };

    return (
        <div className={`admin-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Admin Dashboard</h2>
                </div>

                <nav className="sidebar-nav">
                    <Link
                        to="/overview"
                        onClick={() => setActiveSection('overview')}
                        className={activeSection === 'overview' ? 'active' : ''}
                    >
                        🏠 Overview
                    </Link>
                    <Link
                        to="//managedestinations"
                        onClick={() => setActiveSection('destinations')}
                        className={activeSection === 'destinations' ? 'active' : ''}
                    >
                        🌍 Manage Destinations
                    </Link>
                    <Link
                        to="/users"
                        onClick={() => setActiveSection('users')}
                        className={activeSection === 'users' ? 'active' : ''}
                    >
                        👥 Manage Users
                    </Link>
                    <Link
                        to="/itineraries"
                        onClick={() => setActiveSection('itineraries')}
                        className={activeSection === 'itineraries' ? 'active' : ''}
                    >
                        📅 Manage Itineraries
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Mobile Menu Button */}
                <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>

                {/* Stats Section */}
                <div className="stats-container">
                    <div className="stat-box">Total Users <span>{stats.totalUsers}</span></div>
                    <div className="stat-box">Active Itineraries <span>{stats.activeItineraries}</span></div>
                    <div className="stat-box">Total Destinations <span>{stats.totalDestinations}</span></div>
                    <div className="stat-box">Pending Approvals <span>{stats.pendingApprovals}</span></div>
                </div>

                {/* Section Content */}
                <div className="content-box">
                    {activeSection === 'overview' && <h2>Dashboard Overview</h2>}
                    {activeSection === 'destinations' && <h2>Manage Destinations</h2>}
                    {activeSection === 'users' && <h2>Manage Users</h2>}
                    {activeSection === 'itineraries' && <h2>Manage Itineraries</h2>}
                    <p>Here you can manage the selected section.</p>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
