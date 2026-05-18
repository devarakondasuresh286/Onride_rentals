import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "customer"
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
      const result = await register(formData);
      
      if (result.success) {
        if (result.user?.role === "admin") navigate("/admin");
        else if (result.user?.role === "renter") navigate("/renter");
        else navigate("/dashboard");
      } else {
        setError(result.error || "Registration failed");
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
        <h1>Create your account</h1>
        <p>Join Onride Rentals today</p>
        
        {error && (
          <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="John" required />
          </label>
          <label>
            Last Name
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Doe" required />
          </label>
          <label className="full">
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </label>
          <label className="full">
            Password
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="******" required />
          </label>
          <label className="full">
            Role
            <select name="role" value={formData.role} onChange={handleChange} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", marginTop: "0.5rem" }}>
              <option value="customer">Customer</option>
              <option value="renter">Renter (Host)</option>
            </select>
          </label>
          <button className="book-btn full" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="compact-top">
          Already have an account? <button className="text-link" onClick={() => navigate("/login")}>Log in</button>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
