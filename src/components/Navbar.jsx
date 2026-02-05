import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="logo">PreDusk</div>
            <nav>
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Profiles</NavLink>
                <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
                <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Add Profile</NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
