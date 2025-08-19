export const apiEndpoints = {
  user: {
    login: "/auth/login",
    users: "/users",
  },
  orders: {
    statistics: "/orders/dashboard/statistics",
    reports: "/orders/reports/statistics",
    orders: "/orders",
    hospitalReports: "/orders/reports",
    assignOrder: "/orders/:id/assign",
  },
  userManagement: {
    createUser: "/auth/signup",
    updateStatus: "/users/status/:id",
    updateUser: "/users/:id",
  },
};
