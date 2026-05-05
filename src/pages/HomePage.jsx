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
    <section className="home-page">
      <section className="hero-banner">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            Find Your Perfect
            <br />
            <span>Ride</span>
          </h1>
          <p>
            Rent vehicles from trusted owners near you. From daily commutes to
            weekend adventures, we have you covered.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Pick-up location"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <input type="text" placeholder="Pick-up date" />
            <input type="text" placeholder="Return date" />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <article>
          <h3>5,000+</h3>
          <p>Vehicles</p>
        </article>
        <article>
          <h3>50,000+</h3>
          <p>Happy Renters</p>
        </article>
        <article>
          <h3>200+</h3>
          <p>Cities</p>
        </article>
        <article>
          <h3>4.8</h3>
          <p>Avg. Rating</p>
        </article>
      </section>

      <section className="section-wrap">
        <header className="section-head">
          <div>
            <h2>Featured Vehicles</h2>
            <p>Hand-picked rides for you</p>
          </div>
          <button className="btn btn-ghost">View All</button>
        </header>
        <div className="vehicle-grid three-col">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <section className="how-it-works section-wrap soft">
        <header className="center-head">
          <h2>How It Works</h2>
          <p>Renting a vehicle has never been easier</p>
        </header>

        <div className="steps-grid">
          <article>
            <span className="step-tag">Step 01</span>
            <h3>Search & Compare</h3>
            <p>Browse thousands of vehicles in your area.</p>
          </article>
          <article>
            <span className="step-tag">Step 02</span>
            <h3>Book Instantly</h3>
            <p>Choose your dates, review pricing, and book securely.</p>
          </article>
          <article>
            <span className="step-tag">Step 03</span>
            <h3>Hit the Road</h3>
            <p>Pick up your vehicle and enjoy the ride.</p>
          </article>
        </div>
      </section>

      <section className="host-cta">
        <h2>Ready to List Your Vehicle?</h2>
        <p>Earn extra income by sharing your vehicle with trusted renters.</p>
        <button className="btn btn-accent">Become a Host</button>
      </section>

      <Footer />
    </section>
  );
}

export default HomePage;