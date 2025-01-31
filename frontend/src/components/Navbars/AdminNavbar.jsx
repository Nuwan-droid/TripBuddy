import React, { useState } from 'react';

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
    <div className="min-h-screen bg-light">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r w-64`}>
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white">
          <h2 className="text-xl font-semibold">Travel Admin</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center p-2 rounded-lg ${activeSection === 'overview' ? 'bg-primary text-white' : 'hover:bg-light text-dark'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </button>
          
          <button
            onClick={() => setActiveSection('destinations')}
            className={`w-full flex items-center p-2 rounded-lg ${activeSection === 'destinations' ? 'bg-primary text-white' : 'hover:bg-light text-dark'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage Destinations
          </button>
          
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center p-2 rounded-lg ${activeSection === 'users' ? 'bg-primary text-white' : 'hover:bg-light text-dark'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </button>
          
          <button
            onClick={() => setActiveSection('itineraries')}
            className={`w-full flex items-center p-2 rounded-lg ${activeSection === 'itineraries' ? 'bg-primary text-white' : 'hover:bg-light text-dark'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Manage Itineraries
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Mobile header */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-light"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary text-white p-6 rounded-lg shadow">
            <div className="opacity-75">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="bg-success text-white p-6 rounded-lg shadow">
            <div className="opacity-75">Active Itineraries</div>
            <div className="text-2xl font-bold">{stats.activeItineraries}</div>
          </div>
          <div className="bg-info text-white p-6 rounded-lg shadow">
            <div className="opacity-75">Total Destinations</div>
            <div className="text-2xl font-bold">{stats.totalDestinations}</div>
          </div>
          <div className="bg-warning text-white p-6 rounded-lg shadow">
            <div className="opacity-75">Pending Approvals</div>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">Dashboard Overview</h2>
              <p>Welcome to your travel planner admin dashboard. Monitor key metrics and manage your platform from here.</p>
            </div>
          )}
          
          {activeSection === 'destinations' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">Manage Destinations</h2>
              <div className="space-y-4">
                <button className="bg-success text-white px-4 py-2 rounded-lg hover:opacity-90">
                  Add New Destination
                </button>
                <div className="border rounded-lg p-4">
                  <p>Implement your destination management interface here</p>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">Manage Users</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="p-2 border rounded-lg w-64"
                  />
                  <button className="bg-info text-white px-4 py-2 rounded-lg hover:opacity-90">
                    Export Users
                  </button>
                </div>
                <div className="border rounded-lg p-4 bg-light">
                  <p>Implement your user management interface here</p>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'itineraries' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">Manage Itineraries</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <select className="p-2 border rounded-lg bg-white">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search itineraries..."
                    className="p-2 border rounded-lg flex-1"
                  />
                </div>
                <div className="border rounded-lg p-4 bg-light">
                  <p>Implement your itinerary management interface here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
