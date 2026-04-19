function UserDashboardPage() {
  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <h2>User Menu</h2>
        <a href="#bookings">My Bookings</a>
        <a href="#payments">Payments</a>
        <a href="#profile">Profile</a>
      </aside>

      <div className="dashboard-content">
        <h1>User Dashboard</h1>
        <section id="bookings" className="panel">
          <h3>Recent Bookings</h3>
          <p>Basic section layout for current and upcoming rentals.</p>
        </section>
        <section id="payments" className="panel">
          <h3>Payment Summary</h3>
          <p>Placeholder area for payment history and invoices.</p>
        </section>
        <section id="profile" className="panel">
          <h3>Profile Overview</h3>
          <p>Starter section for user profile settings.</p>
        </section>
      </div>
    </section>
  );
}

export default UserDashboardPage;
