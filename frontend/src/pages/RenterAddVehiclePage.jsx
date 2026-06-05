import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehiclesApi } from "../services/api";

function RenterAddVehiclePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Sedan",
    city: "",
    state: "",
    seats: 5,
    transmission: "Automatic",
    fuel_type: "Gasoline",
    price_per_day: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "seats" || name === "price_per_day" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      image_url: formData.image_url.trim() || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    };

    try {
      await vehiclesApi.createVehicle(payload);
      navigate("/renter");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to create vehicle listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-shell">
      <div className="signup-card" style={{ width: "min(640px, 100%)" }}>
        <h1>List a New Vehicle</h1>
        <p>Enter details below to offer your vehicle for rent.</p>

        {error && (
          <div className="error-message" style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
          <label className="full">
            Vehicle Title
            <input
              type="text"
              name="title"
              placeholder="e.g. 2025 Luxury Sedan"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "0.5rem",
              }}
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="Truck">Truck</option>
            </select>
          </label>

          <label>
            Price per Day ($)
            <input
              type="number"
              name="price_per_day"
              placeholder="e.g. 75"
              min="1"
              value={formData.price_per_day}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              placeholder="e.g. San Francisco"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            State
            <input
              type="text"
              name="state"
              placeholder="e.g. CA"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Seats
            <input
              type="number"
              name="seats"
              min="1"
              max="20"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Transmission
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "0.5rem",
              }}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>

          <label>
            Fuel Type
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "0.5rem",
              }}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </label>

          <label className="full">
            Image URL (Optional)
            <input
              type="url"
              name="image_url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image_url}
              onChange={handleChange}
            />
          </label>

          <div className="full" style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
            <button
              className="outline-btn"
              type="button"
              onClick={() => navigate("/renter")}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              className="book-btn"
              type="submit"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Saving..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RenterAddVehiclePage;
