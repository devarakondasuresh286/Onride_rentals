import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        if (result.user?.role === "admin") navigate("/admin");
        else if (result.user?.role === "renter") navigate("/renter");
        else navigate("/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-shell">
      <div className="signup-card">
        <h1>Welcome back</h1>
        <p>Log in to continue renting or managing vehicles.</p>
        
        {error && (
          <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="full">
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="full">
            Password
            <input
              type="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button
            className="book-btn full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="compact-top">
          New here? <button className="text-link" onClick={() => navigate("/signup")}>Create account</button>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
