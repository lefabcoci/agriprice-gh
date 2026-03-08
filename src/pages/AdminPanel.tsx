import { useState } from "react";
import { Lock, Plus, Trash2, Edit2, LogOut } from "lucide-react";
import { crops, markets, prices } from "@/data/mockData";
import { toast } from "sonner";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      toast.success("Logged in as admin");
    } else {
      toast.error("Invalid credentials. Try admin / admin123");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-6">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-lg animate-fade-in">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-serif font-bold text-foreground">Admin Login</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to manage prices and data</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground btn-hover">
              Sign In
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground text-center">Demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage crops, markets, and prices</p>
        </div>
        <button onClick={() => { setIsLoggedIn(false); toast("Logged out"); }} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Crops */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif font-bold text-foreground">Crops ({crops.length})</h3>
            <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground btn-hover" onClick={() => toast.info("Enable Lovable Cloud for persistence")}>
              <Plus className="h-3 w-3" /> Add Crop
            </button>
          </div>
          <div className="space-y-2">
            {crops.map(crop => (
              <div key={crop.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  <img src={crop.imageUrl} alt={crop.name} className="h-8 w-8 rounded-md object-cover" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{crop.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{crop.category}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => toast.info("Enable Cloud")}><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => toast.info("Enable Cloud")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Markets */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif font-bold text-foreground">Markets ({markets.length})</h3>
            <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground btn-hover" onClick={() => toast.info("Enable Cloud")}>
              <Plus className="h-3 w-3" /> Add Market
            </button>
          </div>
          <div className="space-y-2">
            {markets.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{m.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{m.region}</span>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => toast.info("Enable Cloud")}><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => toast.info("Enable Cloud")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prices table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 font-serif font-bold text-foreground">Price Records ({prices.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-muted-foreground font-medium">Crop</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Market</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Price</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Trend</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Date</th>
                <th className="p-3 text-right text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.slice(0, 16).map(p => {
                const crop = crops.find(c => c.id === p.cropId);
                const market = markets.find(m => m.id === p.marketId);
                return (
                  <tr key={p.id} className="border-b border-border/30 hover:bg-secondary/50 transition-colors">
                    <td className="p-3 text-foreground">{crop?.emoji} {crop?.name}</td>
                    <td className="p-3 text-foreground">{market?.name}</td>
                    <td className="p-3 text-right font-serif font-bold text-foreground">₵{p.price}</td>
                    <td className="p-3 text-right">
                      <span className={`text-xs font-bold ${p.trend === "up" ? "text-price-high" : p.trend === "down" ? "text-price-low" : "text-muted-foreground"}`}>
                        {p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "—"} {p.changePercent}%
                      </span>
                    </td>
                    <td className="p-3 text-right text-muted-foreground">{p.dateRecorded}</td>
                    <td className="p-3 text-right">
                      <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => toast.info("Enable Cloud")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
