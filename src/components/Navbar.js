import { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';


const Navbar = () => {



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const isAuthenticated = !!user;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setUser(null); // Reset user state to null
            navigate('/login');
            toast.success("Logged out successfully");
            
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to logout. Please try again.");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MyApp</Link>
            </div>
            <div className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
                    </li>
                )}
                {isAuthenticated ? (
                    <>
                        <li>
                            <span className="username">Hi, {user.username}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active-link' : ''}>Sign Up</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
