import { useMemo, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { vehicles } from "../data/vehicles";

function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return vehicles.slice(0, 3);
    }

    return vehicles
      .filter((item) => {
        return (
          item.name.toLowerCase().includes(search) ||
          item.type.toLowerCase().includes(search) ||
          item.location.toLowerCase().includes(search)
        );
      })
      .slice(0, 3);
  }, [query]);

  return (
    <section className="stack-lg">
      <section className="hero">
        <h1>Onride Rentals</h1>
        <p>
          Basic home page UI with navbar, hero section, and search functionality.
        </p>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search by vehicle, type, or city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button>Search</Button>
        </div>
      </section>

      <div className="grid three">
        {filtered.length ? (
          filtered.map((vehicle) => (
            <Card
              key={vehicle.id}
              title={vehicle.name}
              subtitle={`${vehicle.type} • ${vehicle.location}`}
              value={`Rs. ${vehicle.pricePerDay}/day`}
              cta="View"
            />
          ))
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
