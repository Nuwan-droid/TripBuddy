import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const styles = {
  manageUsers: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'all 0.5s ease',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    padding: '20px',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
  },
  cardContent: {
    padding: '20px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.2s',
  },
  btnSecondary: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  btnDanger: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  errorAlert: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  usersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    margin: 0,
    fontSize: '16px',
    color: '#333',
  },
  userEmail: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: '#6c757d',
  },
  userActions: {
    display: 'flex',
    gap: '8px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/',

        {
          headers: {
            'Authorization': 'Bearer your_token_here'
          }
        }
      );


      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);



    } catch (err) {
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (userId) => {
    console.log('Editing user:', userId);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}/`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading users...</div>;
  }

  return (
    <div style={{
      ...styles.manageUsers,
      ...(isVisible ? styles.visible : {})
    }}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Manage Users</h2>
        </div>

        <div style={styles.cardContent}>
          {error && (
            <div style={styles.errorAlert}>
              {error}
            </div>
          )}

          <div style={styles.usersList}>
            {users.map((user) => (
              <div key={user.id} style={styles.userItem}>
                <div style={styles.userInfo}>
                  <h3 style={styles.userName}>
                    {user.first_name} {user.last_name}
                  </h3>
                  <p style={styles.userEmail}>{user.email}</p>
                </div>

                <div style={styles.userActions}>
                  <button
                    style={{ ...styles.btn, ...styles.btnSecondary }}
                    onClick={() => handleEdit(user.id)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.btnDanger }}
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;