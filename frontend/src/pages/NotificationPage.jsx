import { BellRing } from "lucide-react";
import { useMemo, useState } from "react";

import { notifications } from "../data/mockData";

function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState(notifications);

  const unreadCount = useMemo(() => items.filter((item) => item.unread).length, [items]);

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return items;
    }

    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
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
        {visibleItems.map((item) => (
          <article key={item.id} className={item.unread ? "notice unread" : "notice"}>
            <BellRing size={18} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <small>{item.time}</small>
            </div>
            <button className="icon-btn" type="button" onClick={() => deleteNotification(item.id)}>
              ×
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NotificationsPage;
