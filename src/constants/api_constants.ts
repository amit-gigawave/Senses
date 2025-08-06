export const apiEndpoints = {
  user: {
    login: "/auth/login",
    users: "/users",
  },
  orders: {
    statistics: "/orders/dashboard/statistics",
    orders: "/orders",
    assignOrder: "/orders/:id/assign",
  },
  userManagement: {
    createUser: "/auth/signup",
    updateStatus: "/users/status/:id",
    updateUser: "/users/:id",
  },
};
