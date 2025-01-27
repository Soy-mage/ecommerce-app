import React from 'react';

export const NavBar = () => {
    return (
        <div className="navbar">
            <h1 className="logo">MyWebsite</h1>
            <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
            <h3 className="cta">Register</h3>
        </div>
    );
};

export default NavBar;