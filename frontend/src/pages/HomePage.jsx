import { CalendarDays, CarFront, MapPin, Search, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { vehiclesApi } from "../services/api";

function HomePage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({ vehicles: 0, users: 0, cities: 0, rating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      vehiclesApi.listVehicles(),
      vehiclesApi.getPublicStats()
    ])
      .then(([vehiclesData, statsData]) => {
        setVehicles(vehiclesData.slice(0, 6));
        setStats(statsData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch homepage data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>
            Find Your Perfect <span>Ride</span>
          </h1>
          <p>
            Rent vehicles from trusted owners near you. From daily commutes to weekend adventures,
            we have you covered.
          </p>
          <div className="hero-search-box">
            <div>
              <MapPin size={18} /> Pick-up location
            </div>
            <div>
              <CalendarDays size={18} /> Pick-up date
            </div>
            <div>
              <CalendarDays size={18} /> Return date
            </div>
            <button onClick={() => navigate("/browse")}>
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <article>
            <CarFront size={22} />
            <h3>{stats.vehicles}+</h3>
            <p>Vehicles</p>
          </article>
          <article>
            <Users size={22} />
            <h3>{stats.users}+</h3>
            <p>Happy Renters</p>
          </article>
          <article>
            <MapPin size={22} />
            <h3>{stats.cities}+</h3>
            <p>Cities</p>
          </article>
          <article>
            <Star size={22} />
            <h3>{stats.rating}</h3>
            <p>Avg. Rating</p>
          </article>
        </div>
      </section>

      <section className="section-block container">
        <div className="section-header">
          <div>
            <h2>Featured Vehicles</h2>
            <p>Hand-picked rides for you</p>
          </div>
          <button className="outline-btn" onClick={() => navigate("/browse")}>
            View All
          </button>
        </div>

        <div className="vehicle-grid">
          {loading ? (
            <p>Loading vehicles...</p>
          ) : (
            vehicles.map((car) => (
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

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <p>Renting a vehicle has never been easier</p>
          <div className="steps-grid">
            <article>
              <div className="icon-box">
                <Search size={26} />
              </div>
              <span>Step 01</span>
              <h3>Search & Compare</h3>
              <p>Browse thousands of vehicles in your area. Filter by type, price, and features.</p>
            </article>
            <article>
              <div className="icon-box">
                <CalendarDays size={26} />
              </div>
              <span>Step 02</span>
              <h3>Book Instantly</h3>
              <p>Choose your dates, review pricing, and book securely in just a few clicks.</p>
            </article>
            <article>
              <div className="icon-box">
                <CarFront size={26} />
              </div>
              <span>Step 03</span>
              <h3>Hit the Road</h3>
              <p>Pick up your vehicle and enjoy the ride. Return it when you are done.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="host-cta">
        <div className="container">
          <h2>Ready to List Your Vehicle?</h2>
          <p>Earn extra income by sharing your vehicle with trusted renters in your area.</p>
          <button onClick={() => navigate("/renter/add")}>Become a Host</button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
