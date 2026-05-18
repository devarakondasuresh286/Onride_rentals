import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RenterAddVehiclePage() {
  const navigate = useNavigate();

  return (
    <section className="page container">
      <article className="add-vehicle-card" onClick={() => navigate("/renter")}> 
        <div className="circle-icon">
          <Plus size={44} />
        </div>
        <h2>Add New Vehicle</h2>
        <p>List a vehicle for rent</p>
      </article>
    </section>
  );
}

export default RenterAddVehiclePage;
