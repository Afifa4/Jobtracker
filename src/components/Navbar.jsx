import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Application Tracker</h1>

                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/applications">Applications</Link>
                    <Link to="/add">Add New</Link>
                    <Link to="/about">About</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
