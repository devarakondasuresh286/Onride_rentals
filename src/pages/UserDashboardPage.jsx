import Footer from "../components/Footer";
import { vehicles } from "../data/vehicles";

const bookings = [
  {
    id: 1,
    vehicleId: 1,
    dateRange: "2026-04-10 to 2026-04-13",
    amount: 210,
    status: "Upcoming",
    action: "Cancel"
  },
  {
    id: 2,
    vehicleId: 3,
    dateRange: "2026-03-15 to 2026-03-18",
    amount: 375,
    status: "Completed",
    action: "Leave Review"
  },
  {
    id: 3,
    vehicleId: 5,
    dateRange: "2026-02-01 to 2026-02-03",
    amount: 165,
    status: "Cancelled",
    action: ""
  }
];

function UserDashboardPage() {
  return (
    <section className="user-dashboard">
      <div className="dashboard-layout user-grid">
        <aside className="profile-card">
          <div className="avatar">JD</div>
          <h2>John Doe</h2>
          <p>john.doe@email.com</p>
          <span className="badge">Customer</span>

          <div className="profile-stats">
            <article>
              <strong>3</strong>
              <span>Bookings</span>
            </article>
            <article>
              <strong>2</strong>
              <span>Favorites</span>
            </article>
            <article>
              <strong>2</strong>
              <span>Reviews</span>
            </article>
          </div>

          <ul className="profile-links">
            <li>Account Settings</li>
            <li>My Vehicles</li>
            <li>Log Out</li>
          </ul>
        </aside>

        <div className="dashboard-content">
          <div className="tab-row">
            <button className="chip active">Bookings</button>
            <button className="chip">Favorites</button>
            <button className="chip">Profile</button>
          </div>

          <h1>My Bookings</h1>

          <div className="booking-list">
            {bookings.map((booking) => {
              const vehicle = vehicles.find((item) => item.id === booking.vehicleId);

              return (
                <article key={booking.id} className="booking-card">
                  <img src={vehicle.image} alt={vehicle.name} />

                  <div className="booking-main">
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.location}</p>
                    <p>{booking.dateRange}</p>
                    <strong>${booking.amount}</strong>
                  </div>

                  <div className="booking-side">
                    <span className={`status-pill ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                    {booking.action ? (
                      <button className="btn btn-ghost danger">{booking.action}</button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default UserDashboardPage;
