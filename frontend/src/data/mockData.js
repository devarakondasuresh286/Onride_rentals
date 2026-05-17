export const featuredVehicles = [
    {
        id: 1,
        title: "2024 Premium Sedan",
        location: "San Francisco, CA",
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        pricePerDay: 65,
        rating: 4.8,
        reviews: 124,
        tag: "Sedan",
        image:
            "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        title: "Luxury SUV Crossover",
        location: "Los Angeles, CA",
        seats: 7,
        transmission: "Automatic",
        fuel: "Hybrid",
        pricePerDay: 89,
        rating: 4.9,
        reviews: 87,
        tag: "SUV",
        image:
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 3,
        title: "Sports Convertible",
        location: "Miami, FL",
        seats: 2,
        transmission: "Manual",
        fuel: "Gasoline",
        pricePerDay: 120,
        rating: 4.7,
        reviews: 56,
        tag: "Sports",
        image:
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    },
];

export const browseVehicles = [
    ...featuredVehicles,
    {
        id: 4,
        title: "Electric City Hatchback",
        location: "Portland, OR",
        seats: 4,
        transmission: "Automatic",
        fuel: "Electric",
        pricePerDay: 45,
        rating: 4.6,
        reviews: 203,
        tag: "Electric",
        image:
            "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 5,
        title: "Rugged Pickup Truck",
        location: "Denver, CO",
        seats: 5,
        transmission: "Automatic",
        fuel: "Diesel",
        pricePerDay: 75,
        rating: 4.5,
        reviews: 98,
        tag: "Truck",
        image:
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 6,
        title: "Family SUV Premium",
        location: "Seattle, WA",
        seats: 7,
        transmission: "Automatic",
        fuel: "Gasoline",
        pricePerDay: 95,
        rating: 4.8,
        reviews: 142,
        tag: "SUV",
        image:
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    },
];

export const customerBookings = [
    {
        id: 1,
        title: "2024 Premium Sedan",
        location: "San Francisco, CA",
        dates: "2026-04-10 -> 2026-04-13",
        amount: 210,
        status: "Upcoming",
        action: "Cancel",
        image: featuredVehicles[0].image,
    },
    {
        id: 2,
        title: "Sports Convertible",
        location: "Miami, FL",
        dates: "2026-03-15 -> 2026-03-18",
        amount: 375,
        status: "Completed",
        action: "Leave Review",
        image: featuredVehicles[2].image,
    },
    {
        id: 3,
        title: "Rugged Pickup Truck",
        location: "Denver, CO",
        dates: "2026-02-01 -> 2026-02-03",
        amount: 165,
        status: "Cancelled",
        action: "",
        image: browseVehicles[4].image,
    },
];

export const notifications = [
    {
        id: 1,
        type: "Bookings",
        title: "Booking Confirmed",
        message: "Your booking for 2024 Premium Sedan has been confirmed for Apr 10-13.",
        time: "2 hours ago",
        unread: true,
    },
    {
        id: 2,
        type: "Payments",
        title: "Payment Received",
        message: "Payment of $210 has been processed successfully.",
        time: "3 hours ago",
        unread: true,
    },
    {
        id: 3,
        type: "Reviews",
        title: "New Review",
        message: "Sarah M. left a 5-star review on your Sports Convertible.",
        time: "1 day ago",
        unread: true,
    },
    {
        id: 4,
        type: "Bookings",
        title: "Vehicle Approved",
        message: "Your Luxury SUV Crossover listing has been approved and is now live.",
        time: "2 days ago",
        unread: false,
    },
    {
        id: 5,
        type: "Bookings",
        title: "Booking Cancelled",
        message: "James W. cancelled the booking for Electric City Hatchback.",
        time: "3 days ago",
        unread: false,
    },
    {
        id: 6,
        type: "Payments",
        title: "Payout Sent",
        message: "Your monthly payout of $520 has been sent to your bank account.",
        time: "5 days ago",
        unread: false,
    },
];

export const favoriteVehicles = [featuredVehicles[1], browseVehicles[3]];

export const renterStats = [
    { label: "Total Earnings", value: "$2450", trend: "+18%" },
    { label: "Bookings", value: "18", trend: "+5" },
    { label: "My Vehicles", value: "3", trend: "" },
    { label: "Avg Rating", value: "4.8", trend: "" },
];

export const renterBookingRequests = [
    {
        id: "rq-100",
        customer: "Sarah M.",
        vehicle: "2024 Premium Sedan",
        dates: "Apr 16-19",
        amount: "$260",
        status: "Pending",
    },
    {
        id: "rq-101",
        customer: "James W.",
        vehicle: "Sports Convertible",
        dates: "Apr 20-21",
        amount: "$240",
        status: "Pending",
    },
];

export const renterEarnings = [
    { month: "January", amount: "$650" },
    { month: "February", amount: "$710" },
    { month: "March", amount: "$1090" },
];

export const adminBookings = [
    {
        id: "ab1",
        customer: "Sarah M.",
        vehicle: "2024 Premium Sedan",
        dates: "Apr 10-13",
        total: "$210",
        status: "Confirmed",
    },
    {
        id: "ab2",
        customer: "James W.",
        vehicle: "Sports Convertible",
        dates: "Apr 5-7",
        total: "$375",
        status: "Active",
    },
    {
        id: "ab3",
        customer: "Emily C.",
        vehicle: "Electric Hatchback",
        dates: "Mar 20-22",
        total: "$105",
        status: "Completed",
    },
    {
        id: "ab4",
        customer: "Robert T.",
        vehicle: "Luxury SUV",
        dates: "Mar 15-18",
        total: "$267",
        status: "Cancelled",
    },
];

export const adminUsers = [
    { id: "u1", name: "John Doe", role: "Customer", city: "San Francisco", status: "Active" },
    { id: "u2", name: "Sarah M.", role: "Renter", city: "Los Angeles", status: "Active" },
    { id: "u3", name: "Robert T.", role: "Customer", city: "Denver", status: "Blocked" },
];

export const adminVehicles = browseVehicles.map((vehicle, index) => ({
    id: `v${index + 1}`,
    name: vehicle.title,
    owner: index % 2 === 0 ? "Sarah M." : "John D.",
    city: vehicle.location,
    price: `$${vehicle.pricePerDay}/day`,
    status: index === 4 ? "Pending" : "Active",
}));
