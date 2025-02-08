import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            // Simulate a login API call
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                { email, password }
            );

            console.log("Login successful:", response.data);

            // Redirect to the home page after successful login
            navigate("/");
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Google OAuth endpoint
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    };

    const handleGitHubLogin = () => {
        // Redirect to GitHub OAuth endpoint
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/github`;
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                    <span
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: "10px", backgroundColor: loading ? "#ccc" : "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div style={{ margin: "20px 0", textAlign: "center" }}>
                <p>Or</p>
                <button
                    onClick={handleGoogleLogin}
                    style={{ width: "100%", padding: "10px", backgroundColor: "#db4437", color: "#fff", border: "none", cursor: "pointer", marginBottom: "10px" }}
                >
                    Sign in with Google
                </button>
                <button
                    onClick={handleGitHubLogin}
                    style={{ width: "100%", padding: "10px", backgroundColor: "#333", color: "#fff", border: "none", cursor: "pointer" }}
                >
                    Sign in with GitHub
                </button>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <p style={{ textAlign: "center" }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;