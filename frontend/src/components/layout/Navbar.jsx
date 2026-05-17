import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse Vehicles" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/renter", label: "Renter" },
    { to: "/notifications", label: "Notifications" },
    { to: "/admin", label: "Admin" },
];

function Navbar() {
    const location = useLocation();

    return (
        <header className="topbar">
            <div className="container topbar-inner">
                <div className="brand-wrap">
                    <span className="brand-mark">Onride</span>
                    <span className="brand-text">Onride</span>
                </div>

                <nav className="topnav">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="topbar-actions">
                    <NavLink className="text-btn" to="/login" aria-label="Log in">
                        Log in
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className={location.pathname === "/signup" ? "primary-btn active" : "primary-btn"}
                    >
                        Sign up
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
