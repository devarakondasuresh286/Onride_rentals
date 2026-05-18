import { useEffect, useMemo, useState } from "react";

import { adminApi } from "../services/api";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("Bookings");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, bookings: 0, vehicles: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData] = await Promise.all([
          adminApi.getSummary()
        ]);
        setStats(statsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        let tabData;
        if (activeTab === "Bookings") {
          tabData = await adminApi.listAllBookings();
        } else if (activeTab === "Vehicles") {
          tabData = await adminApi.listAllVehicles();
        } else {
          tabData = await adminApi.listAllUsers();
        }
        setData(tabData);
      } catch (error) {
        console.error(`Failed to fetch ${activeTab}:`, error);
      }
    };
    fetchTabData();
  }, [activeTab]);

  const rows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return data;
    }

    return data.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedQuery))
    );
  }, [data, query]);

  const columns = useMemo(() => {
    if (activeTab === "Bookings") {
      return ["ID", "User ID", "Vehicle ID", "Start Date", "End Date", "Total", "Status"];
    }

    if (activeTab === "Vehicles") {
      return ["ID", "Title", "Category", "City", "Price", "Status"];
    }

    return ["ID", "First Name", "Last Name", "Email", "Role", "Active"];
  }, [activeTab]);

  const statusClass = (status) => {
    const value = String(status).toLowerCase();
    if (value === "confirmed" || value === "active" || value === "true") return "active";
    if (value === "completed") return "completed";
    if (value === "cancelled" || value === "blocked" || value === "false") return "cancelled";
    return "upcoming";
  };

  return (
    <section className="page container">
      <div className="page-head split">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your platform</p>
        </div>
      </div>

      <div className="admin-stats">
        <article>
          <h3>${stats.revenue?.toFixed(2) || 0}</h3>
          <p>Revenue</p>
        </article>
        <article>
          <h3>{stats.bookings || 0}</h3>
          <p>Bookings</p>
        </article>
        <article>
          <h3>{stats.vehicles || 0}</h3>
          <p>Vehicles</p>
        </article>
        <article>
          <h3>{stats.users || 0}</h3>
          <p>Users</p>
        </article>
      </div>

      <div className="tab-row left compact-top">
        {["Bookings", "Vehicles", "Users"].map((tab) => (
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

      <div className="admin-table-wrap">
        <h3>{activeTab === "Bookings" ? "Recent Bookings" : `Manage ${activeTab}`}</h3>
        <div className="search-field compact-top">
          <input
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  {activeTab === "Bookings" ? (
                    <>
                      <td>{row.user_id}</td>
                      <td>{row.vehicle_id}</td>
                      <td>{row.start_date}</td>
                      <td>{row.end_date}</td>
                      <td>${row.total_price}</td>
                      <td>
                        <span className={`status ${statusClass(row.status)}`}>{row.status}</span>
                      </td>
                    </>
                  ) : null}
                  {activeTab === "Vehicles" ? (
                    <>
                      <td>{row.title}</td>
                      <td>{row.category}</td>
                      <td>{row.city}</td>
                      <td>${row.price_per_day}</td>
                      <td>
                        <span className={`status ${statusClass(row.status)}`}>{row.status}</span>
                      </td>
                    </>
                  ) : null}
                  {activeTab === "Users" ? (
                    <>
                      <td>{row.first_name}</td>
                      <td>{row.last_name}</td>
                      <td>{row.email}</td>
                      <td>{row.role}</td>
                      <td>
                        <span className={`status ${statusClass(row.is_active)}`}>{row.is_active ? "Active" : "Inactive"}</span>
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default AdminPage;
