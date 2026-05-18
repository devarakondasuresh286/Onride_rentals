import { BellRing } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { notificationsApi } from "../services/api";

function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.listNotifications()
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch notifications:", error);
        setLoading(false);
      });
  }, []);

  const unreadCount = useMemo(() => items.filter((item) => !item.is_read).length, [items]);

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return items;
    }

    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  const markAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setItems((prev) => prev.map((item) => ({ ...item, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="page container slim">
      <div className="page-head split">
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount} unread</p>
        </div>
        <button className="outline-btn" type="button" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div className="tab-row left compact-top">
        {["All", "Bookings", "Payments", "Reviews"].map((tab) => (
          <button
            key={tab}
            className={activeFilter === tab ? "tab-btn active" : "tab-btn"}
            type="button"
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="notice-list">
        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          visibleItems.map((item) => (
            <article key={item.id} className={!item.is_read ? "notice unread" : "notice"}>
              <BellRing size={18} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </div>
              <button className="icon-btn" type="button" onClick={() => deleteNotification(item.id)}>
                ×
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default NotificationsPage;
