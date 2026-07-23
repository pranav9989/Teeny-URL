import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <h2>TEENY URL</h2>
            </Link>

            <div className="nav-links">
                <Link to="/" className="nav-link">
                    HOME
                </Link>
                <Link to="/stats" className="nav-link">
                    STATS
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;