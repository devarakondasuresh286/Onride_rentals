import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getMe: () => api.get("/auth/me"),
};

// Vehicles API
export const vehicleApi = {
  getAll: (params) => api.get("/vehicles", { params }),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post("/vehicles", data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
  getByCategory: (category) => api.get(`/vehicles/category/${category}`),
  getByCity: (city) => api.get(`/vehicles/city/${city}`),
  search: (query) => api.get("/vehicles/search", { params: { q: query } }),
};

// Vehicles API (aliased for consistency)
export const vehiclesApi = {
  getPublicStats: () => api.get("/vehicles/stats"),
  listVehicles: () => api.get("/vehicles"),
  getVehicle: (id) => api.get(`/vehicles/${id}`),
  createVehicle: (data) => api.post("/vehicles", data),
  getFavorites: () => api.get("/vehicles/favorites"),
  addFavorite: (vehicleId) => api.post(`/vehicles/${vehicleId}/favorite`),
  removeFavorite: (vehicleId) => api.delete(`/vehicles/${vehicleId}/favorite`),
};

// Bookings API
export const bookingApi = {
  getAll: () => api.get("/bookings"),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post("/bookings", data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  cancel: (id) => api.post(`/bookings/${id}/cancel`),
  getMyBookings: () => api.get("/bookings/my"),
  getUpcoming: () => api.get("/bookings/upcoming"),
  getPast: () => api.get("/bookings/past"),
};

// Bookings API (aliased for consistency)
export const bookingsApi = {
  listBookings: () => api.get("/bookings"),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (data) => api.post("/bookings", data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id) => api.post(`/bookings/${id}/cancel`),
};

// Payments API
export const paymentApi = {
  create: (data) => api.post("/payments", data),
  getById: (id) => api.get(`/payments/${id}`),
  getMyPayments: () => api.get("/payments/my"),
  processPayment: (id) => api.post(`/payments/${id}/process`),
  getPending: () => api.get("/payments/pending"),
};

// Payments API (aliased for consistency)
export const paymentsApi = {
  listPayments: () => api.get("/payments"),
  getPayment: (id) => api.get(`/payments/${id}`),
  createPayment: (data) => api.post("/payments", data),
  updatePayment: (id, data) => api.put(`/payments/${id}`, data),
};

// Favorites API
export const favoriteApi = {
  getAll: () => api.get("/favorites"),
  add: (vehicleId) => api.post("/favorites", { vehicle_id: vehicleId }),
  remove: (vehicleId) => api.delete(`/favorites/${vehicleId}`),
  check: (vehicleId) => api.get(`/favorites/check/${vehicleId}`),
};

// Notifications API
export const notificationApi = {
  getAll: () => api.get("/notifications"),
  getUnread: () => api.get("/notifications/unread"),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllAsRead: () => api.post("/notifications/read-all"),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// Notifications API (aliased for consistency)
export const notificationsApi = {
  listNotifications: () => api.get("/notifications"),
  getNotification: (id) => api.get(`/notifications/${id}`),
  markAsRead: (id) => api.put(`/notifications/${id}`),
  markAllAsRead: () => api.put("/notifications/mark-all-as-read"),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

// Reviews API
export const reviewApi = {
  getByVehicle: (vehicleId) => api.get(`/reviews/vehicle/${vehicleId}`),
  create: (data) => api.post("/reviews", data),
  getMyReviews: () => api.get("/reviews/my"),
};

// Reviews API (aliased for consistency)
export const reviewsApi = {
  listReviews: (vehicleId) => api.get(`/reviews`, { params: { vehicle_id: vehicleId } }),
  getReview: (id) => api.get(`/reviews/${id}`),
  createReview: (data) => api.post("/reviews", data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

// Admin API
export const adminApi = {
  getDashboard: () => api.get("/admin/dashboard"),
  getUsers: () => api.get("/admin/users"),
  getVehicles: () => api.get("/admin/vehicles"),
  getBookings: () => api.get("/admin/bookings"),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  updateVehicleStatus: (id, status) => api.put(`/admin/vehicles/${id}/status`, { status }),
  getSummary: () => api.get("/admin/summary"),
  listAllUsers: () => api.get("/admin/users"),
  listAllVehicles: () => api.get("/admin/vehicles"),
  listAllBookings: () => api.get("/admin/bookings"),
  listAllReviews: () => api.get("/admin/reviews"),
  getRevenueStats: () => api.get("/admin/revenue-stats"),
};

export default api;
