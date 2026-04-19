import Card from "../components/Card";
import { vehicles } from "../data/vehicles";

function BrowseVehiclesPage() {
  return (
    <section className="stack-lg">
      <header>
        <h1>Browse Vehicles</h1>
        <p>Basic listing page structure with reusable card layout.</p>
      </header>

      <div className="grid three">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            title={vehicle.name}
            subtitle={`${vehicle.type} • ${vehicle.location}`}
            value={`Rs. ${vehicle.pricePerDay}/day`}
            cta="Book Now"
          />
        ))}
      </div>
    </section>
  );
}

export default BrowseVehiclesPage;
