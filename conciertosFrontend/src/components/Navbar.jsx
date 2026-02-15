import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/home">Principal</Link>
                    </li>
                    {/* Puedes añadir más <li> aquí para otros enlaces */}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;