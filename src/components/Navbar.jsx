import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Onride Rentals
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/browse">Browse Vehicles</NavLink>
        <NavLink to="/user-dashboard">User Dashboard</NavLink>
        <NavLink to="/renter-dashboard">Renter Dashboard</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
