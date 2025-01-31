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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'} bg-white border-r w-64`}>
        <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white">
          <h2 className="text-xl font-semibold">Travel Admin</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {['overview', 'destinations', 'users', 'itineraries'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full flex items-center p-2 rounded-lg ${
                activeSection === section ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-800'
              }`}
            >
              <span className="w-5 h-5 mr-3">📌</span>
              {section.charAt(0).toUpperCase() + section.slice(1).replace('_', ' ')}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 p-4 transition-all ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow flex-grow">
            <div className="opacity-75">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow flex-grow">
            <div className="opacity-75">Active Itineraries</div>
            <div className="text-2xl font-bold">{stats.activeItineraries}</div>
          </div>
          <div className="bg-cyan-500 text-white p-6 rounded-lg shadow flex-grow">
            <div className="opacity-75">Total Destinations</div>
            <div className="text-2xl font-bold">{stats.totalDestinations}</div>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow flex-grow">
            <div className="opacity-75">Pending Approvals</div>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Dashboard Overview</h2>
              <p>Welcome to your travel planner admin dashboard. Monitor key metrics and manage your platform from here.</p>
            </div>
          )}
          
          {activeSection === 'destinations' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Manage Destinations</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-90">
                Add New Destination
              </button>
              <div className="border rounded-lg p-4 mt-4">
                <p>Implement your destination management interface here</p>
              </div>
            </div>
          )}
          
          {activeSection === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Manage Users</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <input type="text" placeholder="Search users..." className="p-2 border rounded-lg w-64" />
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:opacity-90">
                    Export Users
                  </button>
                </div>
                <div className="border rounded-lg p-4 bg-gray-100">
                  <p>Implement your user management interface here</p>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'itineraries' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-500">Manage Itineraries</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <select className="p-2 border rounded-lg bg-white">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                  <input type="text" placeholder="Search itineraries..." className="p-2 border rounded-lg flex-1" />
                </div>
                <div className="border rounded-lg p-4 bg-gray-100">
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
