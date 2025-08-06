import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
// import sensesLogo from "figma:asset/f4ed2d55b63c4080b9188766b5c68566c5aeeb31.png";
import { Dashboard } from "./components/Dashboard";
import { UserManagement } from "./components/UserManagement";
import { OrderAssignment } from "./components/OrderAssignment";
import { FieldExecutiveManagement } from "./components/FieldExecutiveManagement";
import { Reports } from "./components/Reports";
import { LoginPage } from "./components/LoginPage";
import { Button } from "./components/ui/button";
import { getCookie, removeCookie } from "./lib/utils";
import { toast } from "sonner";
import type { LoginResponse } from "./lib/types";

type ViewType = "dashboard" | "users" | "orders" | "executives" | "reports";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    getCookie("accessToken") ? true : false
  );
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (credentials: LoginResponse) => {
    // Mock login - in real app, this would validate against Supabase
    setCurrentUser({
      email: credentials.user.email,
      name: credentials.user.name,
      role: credentials.user.role,
    });
    setIsLoggedIn(getCookie("accessToken") ? true : false);
  };

  const handleLogout = () => {
    removeCookie("accessToken");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("dashboard");
    toast.success("Logout successful");
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Sample Assignment", icon: ClipboardList },
    { id: "users", label: "User Management", icon: Users },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManagement />;
      case "orders":
        return <OrderAssignment />;
      case "executives":
        return <FieldExecutiveManagement />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    const userString = getCookie("user");

    console.log({ userString });
    if (userString) {
      const decoded = decodeURIComponent(userString);
      const user = JSON.parse(decoded);

      setCurrentUser({
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }
  }, [getCookie("user")]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-[#f5f6fa] flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-white border-r border-[#e9ebef] flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#e9ebef]">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center">
                <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center mr-3 p-1 shadow-sm">
                  {/* <img
                    src={sensesLogo}
                    alt="SENSES Logo"
                    className="w-full h-full object-contain"
                  /> */}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#2c3e50]">
                    SENSES
                  </h2>
                  <p className="text-sm text-[#717182]">Admin Portal</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center p-1 shadow-sm">
                {/* <img
                  src={sensesLogo}
                  alt="SENSES Logo"
                  className="w-full h-full object-contain"
                /> */}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#717182] hover:text-[#2c3e50]"
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      currentView === item.id
                        ? "bg-[#3498db] text-white hover:bg-[#2980b9]"
                        : "text-[#717182] hover:text-[#2c3e50] hover:bg-[#f5f6fa]"
                    }`}
                    onClick={() => setCurrentView(item.id as ViewType)}
                  >
                    <IconComponent className="w-4 h-4 mr-3" />
                    {sidebarOpen && item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#e9ebef]">
          {sidebarOpen && currentUser && (
            <div className="mb-3">
              <p className="text-sm font-medium text-[#2c3e50]">
                {currentUser.name}
              </p>
              <p className="text-xs text-[#717182]">{currentUser.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-[#717182] hover:text-[#e74c3c] hover:bg-[#f5f6fa]"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#e9ebef] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-[#2c3e50]">
                {navigationItems.find((item) => item.id === currentView)
                  ?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[#2c3e50]">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-[#717182]">{currentUser?.email}</p>
              </div>
              <div className="w-8 h-8 bg-[#3498db] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser?.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{renderCurrentView()}</main>
      </div>
    </div>
  );
}
