import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/auth/admin-login/';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.access);
                setSuccessMessage('Admin logged in successfully!');
                navigate('/admin-dashboard'); // Navigate to admin dashboard
                setErrorMessage('');
            } else {
                setErrorMessage(data.detail || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            setErrorMessage('A network error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper login">
                <div className="auth-form">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <button type="submit" className="submit-btn">
                            Login
                        </button>
                    </form>

                    <div className="toggle-form">
                        <p>
                            Go back to
                            <button className="toggle-btn" onClick={() => navigate('/')}> User Login</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
