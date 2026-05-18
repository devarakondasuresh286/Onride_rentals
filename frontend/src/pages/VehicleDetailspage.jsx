import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { vehiclesApi } from "../services/api";

function VehicleDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehiclesApi.getVehicle(Number(id));
        setVehicle(data);
      } catch (error) {
        console.error("Failed to fetch vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <section className="page container">
        <p>Loading vehicle details...</p>
      </section>
    );
  }

  if (!vehicle) {
    return (
      <section className="page container">
        <h1>Vehicle not found</h1>
        <button className="outline-btn" onClick={() => navigate("/browse")}>Back to Browse</button>
      </section>
    );
  }

  return (
    <section className="page container detail-grid">
      <article className="detail-media">
        <img src={vehicle.image_url} alt={vehicle.title} />
      </article>

      <article className="detail-content">
        <span className="tag">{vehicle.category}</span>
        <h1>{vehicle.title}</h1>
        <p className="muted">
          <MapPin size={16} /> {vehicle.city}, {vehicle.state}
        </p>
        <p className="muted">
          {vehicle.seats} seats • {vehicle.transmission} • {vehicle.fuel_type}
        </p>
        <p className="rating-line">
          <Star size={16} className="star" /> {vehicle.rating} ({vehicle.reviews} reviews)
        </p>

        <div className="detail-card">
          <h3>${vehicle.price_per_day}/day</h3>
          <div className="detail-actions">
            <button className="book-btn" onClick={() => navigate("/dashboard")}>Book Now</button>
            <button className="outline-btn" onClick={() => navigate("/dashboard")}>
              <Heart size={16} /> Favorite
            </button>
          </div>
          <button className="outline-btn wide compact-top" onClick={() => navigate("/browse")}>
            <CalendarDays size={16} /> Back to Browse
          </button>
        </div>
      </article>
    </section>
  );
}

export default VehicleDetailsPage;