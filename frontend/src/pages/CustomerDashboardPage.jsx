import { Calendar, MapPin, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { bookingsApi, vehiclesApi, reviewApi, paymentsApi } from "../services/api";

function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Bookings");
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review modal state
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    // Fetch Bookings
    try {
      const bookingsData = await bookingsApi.listBookings();
      setBookings(bookingsData || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    }

    // Fetch Favorites
    try {
      const favoritesData = await vehiclesApi.getFavorites();
      setFavorites(favoritesData || []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites([]);
    }

    // Fetch Reviews
    try {
      const reviewsData = await reviewApi.getMyReviews();
      setReviews(reviewsData || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(
    () => ({
      bookings: bookings.length,
      favorites: favorites.length,
      reviews: reviews.length,
    }),
    [bookings, favorites, reviews]
  );

  const handleBookingAction = async (bookingId, action) => {
    if (action === "Cancel") {
      if (!window.confirm("Are you sure you want to cancel this booking?")) return;
      try {
        await bookingsApi.cancelBooking(bookingId);
        setBookings((prev) =>
          prev.map((item) =>
            item.id === bookingId ? { ...item, status: "cancelled" } : item
          )
        );
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        alert(error.response?.data?.detail || "Failed to cancel booking");
      }
      return;
    }

    navigate("/browse");
  };

  const handlePayNow = async (bookingId) => {
    try {
      await paymentsApi.createPayment({
        booking_id: bookingId,
        method: "card",
      });
      alert("Payment processed successfully!");
      fetchData(); // reload
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error.response?.data?.detail || "Payment failed");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewBooking) return;

    setSubmittingReview(true);
    setReviewError("");

    try {
      await reviewApi.create({
        booking_id: reviewBooking.id,
        rating: Number(reviewRating),
        comment: reviewComment,
      });
      setReviewBooking(null);
      setReviewComment("");
      setReviewRating(5);
      fetchData(); // reload stats & reviews
      alert("Thank you for your review!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      setReviewError(error.response?.data?.detail || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <section className="page container dashboard-grid">
      <aside className="profile-card">
        <div className="avatar">
          {user?.first_name ? user.first_name[0].toUpperCase() : ""}
          {user?.last_name ? user.last_name[0].toUpperCase() : ""}
        </div>
        <h2>{user?.first_name} {user?.last_name}</h2>
        <p>{user?.email}</p>
        <div className="mini-stats">
          <article>
            <strong>{stats.bookings}</strong>
            <span>Bookings</span>
          </article>
          <article>
            <strong>{stats.favorites}</strong>
            <span>Favorites</span>
          </article>
          <article>
            <strong>{stats.reviews}</strong>
            <span>Reviews</span>
          </article>
        </div>
        <div className="side-links">
          <button className="link-btn" type="button" onClick={() => setActiveTab("Profile")}>
            Account Settings
          </button>
          {user?.role === "renter" && (
            <button className="link-btn" type="button" onClick={() => navigate("/renter")}>My Vehicles</button>
          )}
          <button className="link-btn" type="button" onClick={() => { logout(); navigate("/login"); }}>Log Out</button>
        </div>
      </aside>

      <div>
        <div className="tab-row">
          {["Bookings", "Favorites", "Profile"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab-btn active" : "tab-btn"}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Bookings" ? (
          <>
            <h1>My Bookings</h1>
            {loading ? (
              <p>Loading bookings...</p>
            ) : (
              <div className="booking-list">
                {bookings.length === 0 ? (
                  <p className="muted">You have no bookings yet.</p>
                ) : (
                  bookings.map((item) => (
                    <article key={item.id} className="booking-card">
                      <img src={item.image_url} alt={item.vehicle_title} />
                      <div>
                        <h3>{item.vehicle_title}</h3>
                        <p className="muted">
                          <MapPin size={16} /> {item.city}, {item.state}
                        </p>
                        <p className="muted">
                          <Calendar size={16} /> {item.start_date} to {item.end_date}
                        </p>
                        <strong>${item.total_price}</strong>
                      </div>
                      <div className="booking-meta">
                        <span className={`status ${item.status.toLowerCase()}`}>
                          {item.status} ({item.payment_status || "pending"})
                        </span>
                        
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          {item.status === "upcoming" && item.payment_status === "pending" && (
                            <button
                              className="book-btn tiny"
                              type="button"
                              onClick={() => handlePayNow(item.id)}
                            >
                              Pay Now
                            </button>
                          )}

                          {item.status === "upcoming" && (
                            <button
                              className="outline-btn"
                              type="button"
                              onClick={() => handleBookingAction(item.id, "Cancel")}
                              style={{ padding: "6px 12px", fontSize: "13px" }}
                            >
                              Cancel
                            </button>
                          )}

                          {item.status === "completed" && (
                            <button
                              className="book-btn tiny"
                              type="button"
                              onClick={() => setReviewBooking(item)}
                            >
                              Review
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
          </>
        ) : null}

        {activeTab === "Favorites" ? (
          <>
            <h1>My Favorites</h1>
            {loading ? (
              <p>Loading favorites...</p>
            ) : (
              <div className="vehicle-grid compact-top">
                {favorites.map((car) => (
                  <article className="vehicle-card" key={car.id}>
                    <img src={car.image_url} alt={car.title} />
                    <div className="vehicle-body">
                      <h3>{car.title}</h3>
                      <p className="muted">{car.city}, {car.state}</p>
                      <div className="vehicle-row">
                        <strong>${car.price_per_day}/day</strong>
                        <button className="book-btn" onClick={() => navigate(`/vehicle/${car.id}`)}>
                          Book Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        ) : null}

        {activeTab === "Profile" ? (
          <div className="profile-panel">
            <h1>Profile</h1>
            <p className="muted">Manage your account preferences.</p>
            <div className="profile-grid">
              <article>
                <h3>Personal Info</h3>
                <p>Name: {user?.first_name} {user?.last_name}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
              </article>
              <article>
                <h3>Membership</h3>
                <p>Active since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</p>
                <p>Status: {user?.is_active ? "Active" : "Inactive"}</p>
                <button className="outline-btn" onClick={() => navigate("/browse")}>Browse Vehicles</button>
              </article>
            </div>
          </div>
        ) : null}
      </div>

      {/* Review Modal */}
      {reviewBooking && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "grid",
          placeItems: "center",
          zIndex: 100,
          padding: "20px"
        }}>
          <div className="signup-card" style={{ width: "min(480px, 100%)", textAlign: "left" }}>
            <h2>Review {reviewBooking.vehicle_title}</h2>
            <p className="muted">Share your experience with other users.</p>

            {reviewError && (
              <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
                {reviewError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
              <label style={{ display: "grid", fontSize: "14px", fontWeight: "600" }}>
                Rating
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    marginTop: "6px"
                  }}
                >
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Very Good)</option>
                  <option value="3">3 Stars (Good)</option>
                  <option value="2">2 Stars (Fair)</option>
                  <option value="1">1 Star (Poor)</option>
                </select>
              </label>

              <label style={{ display: "grid", fontSize: "14px", fontWeight: "600" }}>
                Comment
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us what you liked or disliked..."
                  rows="4"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    marginTop: "6px",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                  required
                />
              </label>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  className="outline-btn"
                  type="button"
                  onClick={() => setReviewBooking(null)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  className="book-btn"
                  type="submit"
                  disabled={submittingReview}
                  style={{ flex: 1 }}
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default CustomerDashboardPage;
