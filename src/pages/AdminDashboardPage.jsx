const recentBookings = [
  { id: "ab1", customer: "Sarah M.", vehicle: "2024 Premium Sedan", dates: "Apr 10-13", total: "$210", status: "Confirmed" },
  { id: "ab2", customer: "James W.", vehicle: "Sports Convertible", dates: "Apr 5-7", total: "$375", status: "Active" },
  { id: "ab3", customer: "Emily C.", vehicle: "Electric Hatchback", dates: "Mar 20-22", total: "$105", status: "Completed" },
  { id: "ab4", customer: "Robert T.", vehicle: "Luxury SUV", dates: "Mar 15-18", total: "$267", status: "Cancelled" }
];

function AdminDashboardPage() {
  return (
    <section className="admin-page">
      <header className="page-heading with-badge">
        <div>
        <h1>Admin Dashboard</h1>
          <p>Manage your platform</p>
        </div>
        <span className="badge danger">3 pending reviews</span>
      </header>

      <section className="metrics-grid admin">
        <article className="metric-card">
          <h3>$12,450</h3>
          <p>Revenue</p>
        </article>
        <article className="metric-card">
          <h3>156</h3>
          <p>Bookings</p>
        </article>
        <article className="metric-card">
          <h3>42</h3>
          <p>Vehicles</p>
        </article>
        <article className="metric-card">
          <h3>1,240</h3>
          <p>Users</p>
        </article>
      </section>

      <div className="tab-row">
        <button className="chip active">Bookings</button>
        <button className="chip">Vehicles</button>
        <button className="chip">Users</button>
      </div>

      <section className="panel table-panel">
        <div className="table-head">
          <h2>Recent Bookings</h2>
          <input type="text" placeholder="Search bookings..." className="table-search" />
        </div>

        <div className="booking-table-wrap">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Dates</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.vehicle}</td>
                  <td>{booking.dates}</td>
                  <td>{booking.total}</td>
                  <td>
                    <span className={`status-pill ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default AdminDashboardPage;

