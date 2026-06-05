import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { vehiclesApi, bookingsApi, paymentsApi } from "../services/api";

function VehicleDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchVehicleAndFavorites = async () => {
      try {
        const data = await vehiclesApi.getVehicle(Number(id));
        setVehicle(data);

        if (isAuthenticated) {
          const favorites = await vehiclesApi.getFavorites();
          const found = favorites.some((fav) => fav.id === Number(id));
          setIsFavorite(found);
        }
      } catch (error) {
        console.error("Failed to fetch vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleAndFavorites();
  }, [id, isAuthenticated]);

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || end < start) return 0;
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  const totalPrice = useMemo(() => {
    if (!vehicle) return 0;
    return days * vehicle.price_per_day;
  }, [days, vehicle]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      if (isFavorite) {
        await vehiclesApi.removeFavorite(Number(id));
        setIsFavorite(false);
      } else {
        await vehiclesApi.addFavorite(Number(id));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      setBookingError("Please select start and end dates.");
      return;
    }

    if (days <= 0) {
      setBookingError("Invalid date range selected.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");
    setBookingMessage("");

    try {
      // 1. Create Booking
      const bookingRes = await bookingsApi.createBooking({
        vehicle_id: Number(id),
        start_date: startDate,
        end_date: endDate,
      });

      setBookingMessage("Booking created! Processing payment...");

      // 2. Process Payment immediately
      await paymentsApi.createPayment({
        booking_id: bookingRes.id,
        method: "card",
      });

      setBookingMessage("Payment successful! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Booking/Payment failed:", error);
      setBookingError(
        error.response?.data?.detail || "Booking failed. Dates might be unavailable."
      );
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="page container">
        <p>Loading vehicle details...</p>
      </section>
    );
  }

  if (!vehicle) {
    return (
      <section className="page container">
        <h1>Vehicle not found</h1>
        <button className="outline-btn" onClick={() => navigate("/browse")}>Back to Browse</button>
      </section>
    );
  }

  return (
    <section className="page container detail-grid">
      <article className="detail-media">
        <img src={vehicle.image_url} alt={vehicle.title} />
      </article>

      <article className="detail-content">
        <span className="tag">{vehicle.category}</span>
        <h1>{vehicle.title}</h1>
        <p className="muted">
          <MapPin size={16} /> {vehicle.city}, {vehicle.state}
        </p>
        <p className="muted">
          {vehicle.seats} seats • {vehicle.transmission} • {vehicle.fuel_type}
        </p>
        <p className="rating-line">
          <Star size={16} className="star" /> {vehicle.rating} ({vehicle.reviews} reviews)
        </p>

        <div className="detail-card">
          <h3 style={{ marginBottom: "1rem" }}>${vehicle.price_per_day}/day</h3>
          
          <div style={{ display: "grid", gap: "10px", marginBottom: "1rem" }}>
            <label style={{ display: "grid", fontSize: "14px", fontWeight: "600" }}>
              Start Date
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  marginTop: "4px",
                  fontSize: "14px"
                }}
              />
            </label>
            <label style={{ display: "grid", fontSize: "14px", fontWeight: "600" }}>
              End Date
              <input
                type="date"
                value={endDate}
                min={startDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  marginTop: "4px",
                  fontSize: "14px"
                }}
              />
            </label>
          </div>

          {days > 0 && (
            <div style={{ marginBottom: "1rem", padding: "10px", background: "#f8fafc", borderRadius: "8px", border: "1px solid var(--line)" }}>
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span>Duration:</span>
                <strong>{days} day{days > 1 ? "s" : ""}</strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", marginTop: "6px", borderTop: "1px solid #e2e8f0", paddingTop: "6px" }}>
                <span>Total Price:</span>
                <strong style={{ color: "var(--brand-strong)" }}>${totalPrice.toFixed(2)}</strong>
              </p>
            </div>
          )}

          {bookingError && (
            <div style={{ color: "red", fontSize: "14px", marginBottom: "1rem" }}>
              {bookingError}
            </div>
          )}

          {bookingMessage && (
            <div style={{ color: "green", fontSize: "14px", marginBottom: "1rem", fontWeight: "600" }}>
              {bookingMessage}
            </div>
          )}

          <div className="detail-actions">
            <button className="book-btn" onClick={handleBookNow} disabled={bookingLoading}>
              {bookingLoading ? "Processing..." : "Book & Pay"}
            </button>
            <button 
              className="outline-btn" 
              onClick={handleFavoriteToggle}
              style={{ color: isFavorite ? "red" : "var(--brand)", borderColor: isFavorite ? "red" : "#9bcfc8" }}
            >
              <Heart size={16} fill={isFavorite ? "red" : "none"} /> {isFavorite ? "Favorited" : "Favorite"}
            </button>
          </div>
          <button className="outline-btn wide compact-top" onClick={() => navigate("/browse")}>
            <CalendarDays size={16} /> Back to Browse
          </button>
        </div>
      </article>
    </section>
  );
}

export default VehicleDetailsPage;