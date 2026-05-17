import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function MainLayout() {
    return (
        <div className="app-shell">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
