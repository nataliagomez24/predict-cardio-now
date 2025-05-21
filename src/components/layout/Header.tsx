
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HeartPulse, Upload, ChartBar, Calendar } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/', icon: HeartPulse },
    { name: 'Subir Datos', path: '/upload', icon: Upload },
    { name: 'Algoritmos', path: '/algorithms', icon: ChartBar },
    { name: 'Historial', path: '/history', icon: Calendar },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HeartPulse className="h-7 w-7 text-cardio-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-cardio-primary to-cardio-accent bg-clip-text text-transparent">
            CardioPredict
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={isActivePath(item.path) ? "default" : "ghost"}
              className={isActivePath(item.path) ? "bg-cardio-primary text-white" : ""}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              }
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={isActivePath(item.path) ? "default" : "ghost"}
                className={`w-full justify-start ${isActivePath(item.path) ? "bg-cardio-primary text-white" : ""}`}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
