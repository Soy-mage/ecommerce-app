import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <div className="navbar">
            <h1 className="logo">MyWebsite</h1>
            <ul className="nav-links">
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/696969'}><li>Admin</li></Link>
                <li>Contact</li>
            </ul>
            <div className='loginRegister'>
                <Link to={'/login/'}><h3 className="cta">Login</h3></Link>
                <Link to={'/register/'}><h3 className="cta">Register</h3></Link>
            </div>

        </div>
    );
};

export default NavBar;