import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehiclesApi, uploadApi } from "../services/api";
import { UploadCloud, Trash2, Loader2, AlertCircle } from "lucide-react";

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
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const response = await uploadApi.uploadImage(file);
      const url = response.secure_url;
      setFormData((prev) => ({ ...prev, image_url: url }));
    } catch (err) {
      console.error(err);
      setUploadError(err.response?.data?.detail || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image_url: "" }));
    setUploadError("");
  };

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

          <div className="full" style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: 600, fontSize: "14px", display: "block", marginBottom: "4px" }}>
              Vehicle Image
            </span>
            
            {!formData.image_url && !uploading ? (
              <div 
                className={`image-upload-zone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
                <div className="upload-icon-wrap">
                  <UploadCloud size={40} />
                </div>
                <p className="upload-text">
                  <span>Click to upload</span> or drag and drop
                </p>
                <p className="upload-subtext">PNG, JPG, or WEBP up to 10MB</p>
              </div>
            ) : uploading ? (
              <div className="image-upload-zone" style={{ cursor: "default" }}>
                <div className="upload-loading">
                  <Loader2 className="upload-spinner" size={36} />
                  <p className="upload-text">Uploading image to Cloudinary...</p>
                </div>
              </div>
            ) : (
              <div className="upload-preview-container">
                <img src={formData.image_url} alt="Vehicle preview" className="upload-preview-img" />
                <div className="upload-preview-overlay">
                  <button 
                    type="button" 
                    className="upload-remove-btn" 
                    onClick={handleRemoveImage}
                  >
                    <Trash2 size={16} />
                    Remove Image
                  </button>
                </div>
              </div>
            )}
            
            {uploadError && (
              <div className="upload-error-msg">
                <AlertCircle size={16} />
                {uploadError}
              </div>
            )}
            
            <div style={{ marginTop: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Or paste a direct image URL:
              </span>
              <input
                type="url"
                name="image_url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image_url}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  marginTop: "4px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>

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
