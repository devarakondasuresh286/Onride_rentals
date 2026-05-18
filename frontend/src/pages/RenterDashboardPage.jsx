import { Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { vehiclesApi, bookingsApi } from "../services/api";

function RenterDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("My Vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesData, bookingsData] = await Promise.all([
          vehiclesApi.listVehicles(),
          bookingsApi.listBookings()
        ]);
        setVehicles(vehiclesData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Total Vehicles", value: vehicles.length },
    { label: "Active Bookings", value: bookings.filter(b => b.status === "upcoming").length },
    { label: "Total Revenue", value: `$${bookings.reduce((sum, b) => sum + (b.total_price || 0), 0).toFixed(2)}` },
  ];

  return (
    <section className="page container">
      <div className="page-head split">
        <div>
          <h1>Renter Dashboard</h1>
          <p>Manage your vehicles and bookings</p>
        </div>
        <button className="book-btn wide" onClick={() => navigate("/renter/add")}>
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="admin-stats">
        {stats.map((item) => (
          <article key={item.label}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </article>
        ))}
      </div>

      <div className="tab-row">
        {["My Vehicles", "Booking Requests", "Earnings"].map((tab) => (
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

      {activeTab === "My Vehicles" ? (
        loading ? (
          <p>Loading vehicles...</p>
        ) : (
          <div className="vehicle-grid">
            {vehicles.map((car) => (
              <article className="vehicle-card" key={car.id}>
                <img src={car.image_url} alt={car.title} />
                <div className="vehicle-body">
                  <div className="vehicle-row">
                    <h3>{car.title}</h3>
                    <span className="status active">Active</span>
                  </div>
                  <p className="muted">{car.city}, {car.state}</p>
                  <p>
                    <Star size={16} className="star" /> {car.rating} ({car.reviews} reviews)
                  </p>
                  <div className="vehicle-row">
                    <strong>${car.price_per_day}/day</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )
      ) : null}

      {activeTab === "Booking Requests" ? (
        loading ? (
          <p>Loading bookings...</p>
        ) : (
          <div className="admin-table-wrap compact-top">
            <h3>Pending Booking Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.vehicle_title}</td>
                    <td>{item.start_date} to {item.end_date}</td>
                    <td>${item.total_price}</td>
                    <td>
                      <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : null}

      {activeTab === "Earnings" ? (
        <div className="admin-table-wrap compact-top">
          <h3>Monthly Earnings</h3>
          <p>Earnings data will be available from the API</p>
        </div>
      ) : null}
    </section>
  );
}

export default RenterDashboardPage;
