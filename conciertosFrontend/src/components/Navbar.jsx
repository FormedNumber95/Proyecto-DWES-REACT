import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <Link to="/home">Principal</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;