const notifications = [
  {
    id: 1,
    type: "bookings",
    title: "Booking Confirmed",
    detail: "Your booking for 2024 Premium Sedan has been confirmed for Apr 10-13.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    type: "payments",
    title: "Payment Received",
    detail: "Payment of $210 has been processed successfully.",
    time: "3 hours ago",
    unread: true
  },
  {
    id: 3,
    type: "reviews",
    title: "New Review",
    detail: "Sarah L. left a 5-star review on your Sports Convertible.",
    time: "1 day ago",
    unread: true
  },
  {
    id: 4,
    type: "bookings",
    title: "Vehicle Approved",
    detail: "Your Luxury SUV Crossover listing has been approved and is now live.",
    time: "2 days ago",
    unread: false
  },
  {
    id: 5,
    type: "bookings",
    title: "Booking Canceled",
    detail: "James W. canceled the booking for Electric City Hatchback.",
    time: "3 days ago",
    unread: false
  },
  {
    id: 6,
    type: "payments",
    title: "Payout Sent",
    detail: "Your monthly payout of $520 has been sent to your bank account.",
    time: "5 days ago",
    unread: false
  }
];

function NotificationsPage() {
  return (
    <section className="notifications-page">
      <header className="page-heading notifications-head">
        <div>
          <h1>Notifications</h1>
          <p>3 unread</p>
        </div>
        <button className="btn btn-ghost">Mark all read</button>
      </header>

      <div className="notification-filters">
        <button className="chip active">All</button>
        <button className="chip">Bookings</button>
        <button className="chip">Payments</button>
        <button className="chip">Reviews</button>
      </div>

      <div className="notifications-list">
        {notifications.map((item) => (
          <article
            key={item.id}
            className={`notification-item ${item.unread ? "unread" : ""}`}
          >
            <div>
              <h3>
                {item.title} {item.unread ? <span className="dot" /> : null}
              </h3>
              <p>{item.detail}</p>
              <small>{item.time}</small>
            </div>
            <button className="icon-btn" aria-label={`Delete ${item.title}`}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NotificationsPage;
