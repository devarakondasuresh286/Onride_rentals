import Footer from "../components/Footer";
import { vehicles } from "../data/vehicles";

function RenterDashboardPage() {
  const listedVehicles = vehicles.slice(0, 3);

  return (
    <section className="renter-dashboard">
      <header className="page-heading with-action">
        <div>
          <h1>Renter Dashboard</h1>
          <p>Manage your vehicles and bookings</p>
        </div>
        <button className="btn btn-primary add-btn">Add Vehicle</button>
      </header>

      <section className="metrics-grid">
        <article className="metric-card">
          <h3>$2450</h3>
          <p>Total Earnings</p>
        </article>
        <article className="metric-card">
          <h3>18</h3>
          <p>Bookings</p>
        </article>
        <article className="metric-card">
          <h3>3</h3>
          <p>My Vehicles</p>
        </article>
        <article className="metric-card">
          <h3>4.8</h3>
          <p>Avg Rating</p>
        </article>
      </section>

      <div className="tab-row">
        <button className="chip active">My Vehicles</button>
        <button className="chip">Booking Requests</button>
        <button className="chip">Earnings</button>
      </div>

      <section className="renter-cards-grid">
        {listedVehicles.map((vehicle) => (
          <article className="renter-vehicle-card" key={vehicle.id}>
            <img src={vehicle.image} alt={vehicle.name} />
            <div className="renter-vehicle-body">
              <h3>{vehicle.name}</h3>
              <p>{vehicle.location}</p>
              <div className="renter-vehicle-foot">
                <span>{vehicle.rating} ({vehicle.reviews} reviews)</span>
                <strong>${vehicle.pricePerDay}/day</strong>
              </div>
            </div>
          </article>
        ))}

        <article className="add-vehicle-card">
          <span>+</span>
          <h3>Add New Vehicle</h3>
          <p>List a vehicle for rent</p>
        </article>
      </section>

      <Footer />
    </section>
  );
}

export default RenterDashboardPage;
