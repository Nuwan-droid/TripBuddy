import React, { useState } from 'react';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleToRegister = (e) => {
    e.preventDefault();
    setIsRegister(true);
  };

  const toggleToLogin = (e) => {
    e.preventDefault();
    setIsRegister(false);
  };

  return (
    <div className="container">
      <div className={`wrapper ${isRegister ? 'register-active' : 'login-active'}`}>
        
        {!isRegister && (
          <div className="form-box login">
            <form>
              <h2>Login</h2>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required />
              </div>
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
            <form>
              <h2>Registration</h2>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required />
              </div>
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
    </div>
  );
};

export default LoginRegister;
