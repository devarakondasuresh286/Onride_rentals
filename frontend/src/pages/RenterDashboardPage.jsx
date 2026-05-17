import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { featuredVehicles, renterBookingRequests, renterEarnings, renterStats } from "../data/mockData";

function RenterDashboardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("My Vehicles");

    return (
        <section className="page container">
            <div className="page-head split">
                <div>
                    <h1>Renter Dashboard</h1>
                    <p>Manage your vehicles and bookings</p>
                </div>
                <button className="book-btn wide" onClick={() => navigate("/renter/add")}>
                    <Plus size={18} /> Add Vehicle
                </button>
            </div>

            <div className="admin-stats">
                {renterStats.map((item) => (
                    <article key={item.label}>
                        <h3>{item.value}</h3>
                        <p>{item.label}</p>
                        {item.trend ? <small className="trend">{item.trend}</small> : null}
                    </article>
                ))}
            </div>

            <div className="tab-row">
                {["My Vehicles", "Booking Requests", "Earnings"].map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? "tab-btn active" : "tab-btn"}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "My Vehicles" ? (
                <div className="vehicle-grid">
                    {featuredVehicles.map((car) => (
                        <article className="vehicle-card" key={car.id}>
                            <img src={car.image} alt={car.title} />
                            <div className="vehicle-body">
                                <div className="vehicle-row">
                                    <h3>{car.title}</h3>
                                    <span className="status active">Active</span>
                                </div>
                                <p className="muted">{car.location}</p>
                                <p>
                                    <Star size={16} className="star" /> {car.rating} ({car.reviews} reviews)
                                </p>
                                <div className="vehicle-row">
                                    <strong>${car.pricePerDay}/day</strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : null}

            {activeTab === "Booking Requests" ? (
                <div className="admin-table-wrap compact-top">
                    <h3>Pending Booking Requests</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Dates</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renterBookingRequests.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.vehicle}</td>
                                    <td>{item.dates}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <button className="book-btn tiny" type="button">Approve</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {activeTab === "Earnings" ? (
                <div className="admin-table-wrap compact-top">
                    <h3>Monthly Earnings</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renterEarnings.map((item) => (
                                <tr key={item.month}>
                                    <td>{item.month}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </section>
    );
}

export default RenterDashboardPage;
