import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart);
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
                        <h3 className="welcome"> &#40;{user.email}&#41;</h3>
                        <Link to={'/cart'}>
                            <button className="cart-button">
                            🛒{cart.length > 0 && <span>{cart.length}</span>}
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