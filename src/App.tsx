import { useEffect, useState } from "react";

import { LayoutDashboard, Users, ClipboardList, BarChart3 } from "lucide-react";
// import sensesLogo from "figma:asset/f4ed2d55b63c4080b9188766b5c68566c5aeeb31.png";
import { Dashboard } from "./components/Dashboard";
import { UserManagement } from "./components/UserManagement";
import { OrderAssignment } from "./components/OrderAssignment";
import { FieldExecutiveManagement } from "./components/FieldExecutiveManagement";
import { Reports } from "./components/Reports";
import { LoginPage } from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { getCookie, removeCookie } from "./lib/utils";
import { toast } from "sonner";
import type { LoginResponse } from "./lib/types";
import { Route, Switch, useLocation } from "wouter";
import { ForgotPassword } from "./components/ForgorPassword";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getCookie("accessToken") ? true : false
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location, setLocation] = useLocation();

  const getNavigationItems = () => [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/orders", label: "Sample Assignment", icon: ClipboardList },
    { path: "/users", label: "User Management", icon: Users },
    ...(currentUser?.role !== "admin"
      ? [
          {
            path: "/reports",
            label: "Reports & Analytics",
            icon: BarChart3,
          },
        ]
      : []),
  ];

  const navigationItems = getNavigationItems();

  useEffect(() => {
    if (
      !isLoggedIn &&
      location !== "/login" &&
      location !== "/forgot-password"
    ) {
      setLocation("/login");
    }
    if (isLoggedIn && location === "/login") {
      setLocation("/");
    }
    // Redirect admin users away from reports page if they try to access it directly
    if (
      isLoggedIn &&
      location === "/reports" &&
      currentUser?.role === "admin"
    ) {
      setLocation("/");
    }
  }, [isLoggedIn, location, setLocation, currentUser]);

  const handleLogin = (credentials: LoginResponse) => {
    // Mock login - in real app, this would validate against Supabase
    setCurrentUser({
      email: credentials.user.email,
      name: credentials.user.name,
      role: credentials.user.role,
    });
    setIsLoggedIn(getCookie("accessToken") ? true : false);
    setLocation("/");
  };

  const handleLogout = () => {
    removeCookie("accessToken");
    setIsLoggedIn(false);
    setCurrentUser(null);
    toast.success("Logout successful");
    setLocation("/login");
  };

  useEffect(() => {
    const userString = getCookie("user");

    console.log({ userString });
    if (userString) {
      try {
        const decoded = decodeURIComponent(userString);
        const user = JSON.parse(decoded);

        setCurrentUser({
          email: user.email,
          name: user.name,
          role: user.role,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [isLoggedIn]);

  // Handle authentication routes
  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        {/* Redirect to login for any other route when not logged in */}
        <Route>
          <LoginPage onLogin={handleLogin} />
        </Route>
      </Switch>
    );
  }

  // Handle authenticated routes
  return (
    <div className="h-screen bg-[#f5f6fa] flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems}
        location={location}
        onNavigate={setLocation}
        currentUser={
          currentUser
            ? { name: currentUser.name, role: currentUser.role }
            : null
        }
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={
            navigationItems.find((item) => item.path === location)?.label ||
            "Dashboard"
          }
          userName={currentUser?.name}
          userEmail={currentUser?.email}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/orders">
              <OrderAssignment />
            </Route>
            <Route path="/users">
              <UserManagement />
            </Route>
            <Route path="/reports">
              {currentUser?.role !== "admin" ? (
                <Reports />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Access Denied
                  </h2>
                  <p className="text-gray-600">
                    Admin users do not have access to reports.
                  </p>
                </div>
              )}
            </Route>
            <Route path="/executives">
              <FieldExecutiveManagement />
            </Route>
            {/* Fallback */}
            <Route>
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}
