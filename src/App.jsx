import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BrowseVehiclesPage from "./pages/BrowseVehiclesPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import RenterDashboardPage from "./pages/RenterDashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseVehiclesPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/user-dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/renter-dashboard" element={<RenterDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
