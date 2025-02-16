import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const getUserSession = () => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    };

    // console.log(getUserSession()); // Log the userData from above

    const handleClick = async () => {
        await logout();
        navigate('/');
    }
    return (
        <div className="navbar">
            <h1 className="logo">MyWebsite</h1>
            <ul className="nav-links">
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/696969'}><li>Admin</li></Link>
                <li>Contact</li>
            </ul>
            <div className='loginRegister'>
                {isLoggedIn ? (
                    <>
                        <h3 className="welcome">Welcome back, {user.username}!</h3>
                        <Link to={'/cart'}>
                            <button className="cart-button">
                                Cart {cartItems.length > 0 && <span>({cartItems.length})</span>}
                            </button>
                        </Link>
                        <button onClick={handleClick} className="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to={'/login/'}><h3 className="cta">Login</h3></Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;