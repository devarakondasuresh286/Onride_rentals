import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { vehiclesApi } from "../services/api";

function BrowsePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [priceSortAsc, setPriceSortAsc] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vehiclesApi.listVehicles()
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch vehicles:", error);
        setLoading(false);
      });
  }, []);

  const filteredVehicles = useMemo(() => {
    const byFilter = vehicles.filter((car) => {
      const matchesType = typeFilter === "All Types" || car.category === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || car.title.toLowerCase().includes(q) || car.city.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });

    return byFilter.sort((a, b) =>
      priceSortAsc ? a.price_per_day - b.price_per_day : b.price_per_day - a.price_per_day
    );
  }, [query, typeFilter, priceSortAsc, vehicles]);

  return (
    <section className="page container">
      <div className="page-head">
        <h1>Browse Vehicles</h1>
        <p>Find the perfect vehicle for your trip</p>
      </div>

      <div className="toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option>All Types</option>
          <option>SUV</option>
          <option>Sedan</option>
          <option>Truck</option>
          <option>Sports</option>
          <option>Electric</option>
        </select>
        <button className="outline-btn wide" onClick={() => setPriceSortAsc((prev) => !prev)}>
          <SlidersHorizontal size={18} /> {priceSortAsc ? "Price Low to High" : "Price High to Low"}
        </button>
      </div>

      <p className="muted">{loading ? "Loading..." : `${filteredVehicles.length} vehicles found`}</p>

      <div className="vehicle-grid">
        {loading ? (
          <p>Loading vehicles...</p>
        ) : (
          filteredVehicles.map((car) => (
            <article className="vehicle-card" key={car.id}>
              <img src={car.image_url} alt={car.title} />
              <div className="vehicle-body">
                <div className="tag">{car.category}</div>
                <div className="vehicle-row">
                  <h3>{car.title}</h3>
                  <p>
                    <Star size={16} className="star" /> {car.rating} ({car.reviews})
                  </p>
                </div>
                <p className="muted">{car.city}, {car.state}</p>
                <p className="muted small">
                  {car.seats} seats • {car.transmission} • {car.fuel_type}
                </p>
                <div className="vehicle-row">
                  <strong>${car.price_per_day}/day</strong>
                  <button className="book-btn" onClick={() => navigate(`/vehicle/${car.id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default BrowsePage;
