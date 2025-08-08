import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import type { ComponentType } from "react";

type NavigationItem = {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type SidebarProps = {
  sidebarOpen: boolean;
  onToggle: () => void;
  navigationItems: NavigationItem[];
  location: string;
  onNavigate: (path: string) => void;
  currentUser: { name: string; role: string } | null;
  onLogout: () => void;
};

export default function Sidebar({
  sidebarOpen,
  onToggle,
  navigationItems,
  location,
  onNavigate,
  currentUser,
  onLogout,
}: SidebarProps) {
  return (
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
                <img
                  src={"/images/logo.jpg"}
                  alt="SENSES Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#2c3e50]">SENSES</h2>
                <p className="text-sm text-[#717182]">Admin Portal</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-6 bg-white rounded flex items-center justify-center p-1 shadow-sm" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
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
            const isActive = location === item.path;
            return (
              <li key={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-[#3498db] text-white hover:bg-[#2980b9]"
                      : "text-[#717182] hover:text-[#2c3e50] hover:bg-[#f5f6fa]"
                  }`}
                  onClick={() => onNavigate(item.path)}
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
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          {sidebarOpen && "Logout"}
        </Button>
      </div>
    </div>
  );
}
