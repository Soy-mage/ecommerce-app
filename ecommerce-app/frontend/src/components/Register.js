import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { register } from "../api-calls/apiCalls";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError("");

        console.log("Email:", email, "Password:", password);
        try {
            // Call the register function
            await register(email, password);

            // Handle successful registration (e.g., redirect or show a success message)
            console.log("Registration successful!");
            setSuccess("Account created successfully!")
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            // Set the error message from the register function
            setError(error.message);
        }

    };
    const handleGoogleLogin = async (response) => {
        console.log("Google Login Response:", response);
        // Send the response to your backend for verification
    };

    const handleFacebookLogin = async (response) => {
        console.log("Facebook Login Response:", response);
        // Send the response to your backend for verification
    };

    return (
        <div className="registration-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Passwords
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button type="submit">Register</button>
            </form>

            <div className="oauth-buttons">
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Google Login Failed")}
                />
                <FacebookLogin
                    appId="YOUR_FACEBOOK_APP_ID"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleFacebookLogin}
                />
            </div>
        </div>
    );
};

export default Register;