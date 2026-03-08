import { Link, useLocation } from "react-router-dom";
import { BarChart3, GitCompare, Shield, MessageSquare, Phone } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/admin", label: "Admin", icon: Shield },
  { path: "/sms", label: "SMS", icon: MessageSquare },
  { path: "/ussd", label: "USSD", icon: Phone },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-lg font-bold text-primary">AgriPrice</span>
          <span className="text-xs font-medium text-muted-foreground">GH</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
