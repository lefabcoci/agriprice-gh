import { Link, useLocation } from "react-router-dom";
import { BarChart3, GitCompare, Shield, MessageSquare, Phone, Search, Bell } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: BarChart3 },
  { path: "/prices", label: "Prices", icon: BarChart3 },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/sms", label: "SMS", icon: MessageSquare },
  { path: "/ussd", label: "USSD", icon: Phone },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
        📱 Dial <span className="font-bold">*384#</span> or SMS <span className="font-bold">PRICE MAIZE ACCRA</span> to get prices on any phone!
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-serif font-bold text-primary">AgriPrice</span>
            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">GH</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crops, markets..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
            <div className="ml-2 h-6 w-px bg-border" />
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-secondary">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/admin"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span className="hidden lg:inline">Admin</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
