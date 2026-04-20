import Card from "../components/Card";

function AdminDashboardPage() {
  return (
    <section className="stack-lg">
      <header>
        <h1>Admin Dashboard</h1>
        <p>Basic admin dashboard layout started in Week 3.</p>
      </header>

      <div className="grid three">
        <Card title="Users" subtitle="Basic section for user management" cta="Open" />
        <Card title="Vehicles" subtitle="Basic section for vehicle approvals" cta="Open" />
        <Card title="Bookings" subtitle="Basic section for booking monitoring" cta="Open" />
      </div>
    </section>
  );
}

export default AdminDashboardPage;
