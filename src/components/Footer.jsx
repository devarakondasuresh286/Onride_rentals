import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3 className="footer-brand">Onride</h3>
          <p>
            Find and rent the perfect vehicle for your next adventure. Trusted by
            thousands of renters and owners.
          </p>
        </section>

        <section>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/browse">Browse Vehicles</Link>
            </li>
            <li>
              <Link to="/">How It Works</Link>
            </li>
            <li>
              <Link to="/renter-dashboard">List Your Vehicle</Link>
            </li>
          </ul>
        </section>

        <section>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Safety</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </section>

        <section>
          <h4>Contact</h4>
          <ul>
            <li>support@onride.com</li>
            <li>+1 (555) 123-4567</li>
            <li>San Francisco, CA</li>
          </ul>
        </section>
      </div>

      <p className="footer-copy">2026 Onride Rentals. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
