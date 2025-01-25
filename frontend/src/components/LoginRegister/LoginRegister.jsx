import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleToRegister = (e) => {
    e.preventDefault();
    setIsRegister(true);
    setErrorMessage('');
  };

  const toggleToLogin = (e) => {
    e.preventDefault();
    setIsRegister(false);
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username,
        password,
      });
      // Handle successful login
      console.log('Login successful', response.data);
      setIsLoggedIn(true); // Set login state to true
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register/', {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      // Handle successful registration
      console.log('Registration successful', response.data);
      setIsRegister(false); // Go back to login after successful registration
    } catch (error) {
      setErrorMessage('Registration failed, try again');
    }
  };

  const handleLogout = () => {
    // Reset login state
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        // Login or Register form based on state
        <div className={`wrapper ${isRegister ? 'register-active' : 'login-active'}`}>
          {!isRegister && (
            <div className="form-box login">
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="switch-link">
                  <p>
                    Don’t have an account?{' '}
                    <a href="#" onClick={toggleToRegister}>
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}

          {isRegister && (
            <div className="form-box register">
              <form onSubmit={handleRegister}>
                <h2>Registration</h2>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <div className="checkbox-box">
                  <label>
                    <input type="checkbox" /> I agree to the terms & conditions
                  </label>
                </div>
                <button type="submit">Register</button>
                <div className="switch-link">
                  <p>
                    Already have an account?{' '}
                    <a href="#" onClick={toggleToLogin}>
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        // User page (visible when logged in)
        <div className="user-page">
          <h2>Welcome to your user page!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
