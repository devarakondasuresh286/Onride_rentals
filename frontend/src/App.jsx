import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminPage from "./pages/AdminPage";
import BrowsePage from "./pages/BrowsePage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import RenterAddVehiclePage from "./pages/RenterAddVehiclePage";
import RenterDashboardPage from "./pages/RenterDashboardPage";
import SignupPage from "./pages/SignupPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/dashboard" element={<CustomerDashboardPage />} />
                <Route path="/renter" element={<RenterDashboardPage />} />
                <Route path="/renter/add" element={<RenterAddVehiclePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
