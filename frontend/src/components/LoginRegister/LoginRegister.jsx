import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import backgroundVideo from "../../../src/assets/img/vid1.mov";

const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Toggle between Login & Register
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage("");
        setSuccessMessage("");
        setFormData({
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        });
    };

    // Handle Admin Login Redirect
    const handleAdminLogin = () => {
        navigate("/admin-login");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin
            ? "http://localhost:8000/auth/login/"
            : "http://localhost:8000/auth/register/";

        const payload = isLogin
            ? {
                  username: formData.username,
                  password: formData.password,
              }
            : {
                  username: formData.username,
                  email: formData.email,
                  password: formData.password,
                  password_confirmation: formData.passwordConfirmation,
              };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem("token", data.access); // Store token
                    setSuccessMessage("Logged in successfully!");
                    navigate("/dashboard"); // Redirect to Dashboard 🚀
                } else {
                    setSuccessMessage("Registered successfully! Please log in.");
                    setIsLogin(true);
                    setFormData({
                        username: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                    });
                }
                setErrorMessage("");
            } else {
                setErrorMessage(data.detail || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setErrorMessage("A network error occurred. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            {/* Background Video */}
            <div className="video-container">
                <video autoPlay loop muted className="background-video">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className={`auth-wrapper ${isLogin ? "login" : "register"}`}>
                <div className="auth-form">
                    <h2>{isLogin ? "Login" : "Register"}</h2>
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

                        {!isLogin && (
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

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

                        {!isLogin && (
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirm Password"
                                    value={formData.passwordConfirmation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}

                        <button type="submit" className="submit-btn">
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    <div className="toggle-form">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button className="toggle-btn" onClick={toggleForm}>
                                {isLogin ? "Register" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
