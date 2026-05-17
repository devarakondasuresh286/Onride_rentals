import { CarFront, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div>
                    <h3 className="footer-title brand-title">
                        <CarFront size={18} /> Onride
                    </h3>
                    <p className="footer-text">
                        Find and rent the perfect vehicle for your next adventure. Trusted by thousands of
                        renters and owners.
                    </p>
                </div>

                <div>
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-list">
                        <li>
                            <NavLink to="/browse">Browse Vehicles</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">How It Works</NavLink>
                        </li>
                        <li>
                            <NavLink to="/renter/add">List Your Vehicle</NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="footer-title">Support</h4>
                    <ul className="footer-list">
                        <li>Help Center</li>
                        <li>Safety</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <h4 className="footer-title">Contact</h4>
                    <ul className="footer-list with-icons">
                        <li>
                            <Mail size={18} /> support@onride.com
                        </li>
                        <li>
                            <Phone size={18} /> +1 (555) 123-4567
                        </li>
                        <li>
                            <MapPin size={18} /> San Francisco, CA
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container footer-copy">© 2026 Onride Rentals. All rights reserved.</div>
        </footer>
    );
}

export default Footer;
