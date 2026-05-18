import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AdminPage from "./pages/AdminPage";
import BrowsePage from "./pages/BrowsePage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationPage";
import RenterAddVehiclePage from "./pages/RenterAddVehiclePage";
import RenterDashboardPage from "./pages/RenterDashboardPage";
import SignupPage from "./pages/SignupPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute allowedRoles={["customer", "renter", "admin"]} />}>
          <Route path="/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["renter"]} />}>
          <Route path="/renter" element={<RenterDashboardPage />} />
          <Route path="/renter/add" element={<RenterAddVehiclePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
