import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Define navigation links dynamically based on role
  const getNavLinks = () => {
    const links = [
      { to: "/", label: "Home" },
      { to: "/browse", label: "Browse Vehicles" },
    ];

    if (isAuthenticated && user) {
      if (user.role === "admin") {
        links.push({ to: "/admin", label: "Admin" });
      } else if (user.role === "renter") {
        links.push({ to: "/renter", label: "Host Dashboard" });
      } else {
        links.push({ to: "/dashboard", label: "Dashboard" });
      }
      links.push({ to: "/notifications", label: "Notifications" });
    }

    return links;
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand-wrap" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
          {isAuthenticated && user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>
                Hi, {user.first_name}
              </span>
              <button
                className="outline-btn"
                type="button"
                onClick={handleLogout}
                style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "14px" }}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <NavLink className="text-btn" to="/login" aria-label="Log in">
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className={location.pathname === "/signup" ? "primary-btn active" : "primary-btn"}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
