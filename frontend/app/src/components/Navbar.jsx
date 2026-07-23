import react from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav>
                <h2>TEENY URL</h2>
                <Link to="/"> HOME</Link>
                <Link to="stats" >STATS</Link>
            </nav>
        </>
    );
}

export default Navbar;