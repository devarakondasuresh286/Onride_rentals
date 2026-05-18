import { Calendar, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { bookingsApi, vehiclesApi, reviewApi } from "../services/api";

function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Bookings");
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, favoritesData, reviewsData] = await Promise.all([
          bookingsApi.listBookings(),
          vehiclesApi.getFavorites(),
          reviewApi.getMyReviews()
        ]);
        setBookings(bookingsData);
        setFavorites(favoritesData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
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

  const handleBookingAction = (bookingId, action) => {
    if (action === "Cancel") {
      setBookings((prev) =>
        prev.map((item) =>
          item.id === bookingId ? { ...item, status: "Cancelled", action: "" } : item
        )
      );
      return;
    }

    navigate("/browse");
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
          <button className="link-btn" type="button" onClick={() => navigate("/renter")}>My Vehicles</button>
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
                {bookings.map((item) => (
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
                      <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                      {item.status === "upcoming" ? (
                        <button
                          className="outline-btn"
                          type="button"
                          onClick={() => handleBookingAction(item.id, "Cancel")}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))}
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
    </section>
  );
}

export default CustomerDashboardPage;
