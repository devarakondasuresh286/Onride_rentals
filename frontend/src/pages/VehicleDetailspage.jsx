import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { browseVehicles } from "../data/mockData";

function VehicleDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const vehicle = useMemo(
    () => browseVehicles.find((item) => item.id === Number(id)) || browseVehicles[0],
    [id]
  );

  return (
    <section className="page container detail-grid">
      <article className="detail-media">
        <img src={vehicle.image} alt={vehicle.title} />
      </article>

      <article className="detail-content">
        <span className="tag">{vehicle.tag}</span>
        <h1>{vehicle.title}</h1>
        <p className="muted">
          <MapPin size={16} /> {vehicle.location}
        </p>
        <p className="muted">
          {vehicle.seats} seats • {vehicle.transmission} • {vehicle.fuel}
        </p>
        <p className="rating-line">
          <Star size={16} className="star" /> {vehicle.rating} ({vehicle.reviews} reviews)
        </p>

        <div className="detail-card">
          <h3>${vehicle.pricePerDay}/day</h3>
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