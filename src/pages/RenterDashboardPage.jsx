function RenterDashboardPage() {
  return (
    <section className="dashboard-layout">
      <aside className="sidebar">
        <h2>Renter Menu</h2>
        <a href="#vehicles">My Vehicles</a>
        <a href="#availability">Availability</a>
        <a href="#earnings">Earnings</a>
      </aside>

      <div className="dashboard-content">
        <h1>Renter Dashboard</h1>
        <section id="vehicles" className="panel">
          <h3>Vehicle Management</h3>
          <div className="vehicle-row">
            <span>Honda City</span>
            <span>Active</span>
            <span>Rs. 2400/day</span>
          </div>
          <div className="vehicle-row">
            <span>TVS Ntorq</span>
            <span>Maintenance</span>
            <span>Rs. 500/day</span>
          </div>
        </section>
        <section id="availability" className="panel">
          <h3>Availability Calendar</h3>
          <p>Starter placeholder for availability scheduling UI.</p>
        </section>
        <section id="earnings" className="panel">
          <h3>Earnings Snapshot</h3>
          <p>Basic section showing weekly and monthly earnings summary.</p>
        </section>
      </div>
    </section>
  );
}

export default RenterDashboardPage;
