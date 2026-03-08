import { useState } from "react";
import { Lock, Plus, Trash2, Edit2 } from "lucide-react";
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
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 animate-fade-in">
          <div className="mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Login
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground text-center">Demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <button onClick={() => { setIsLoggedIn(false); toast("Logged out"); }} className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary transition-colors">
          Logout
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Crops Management */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Crops ({crops.length})</h3>
            <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground" onClick={() => toast.info("Add crop feature — connect Lovable Cloud for persistence")}>
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {crops.map(crop => (
              <div key={crop.id} className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/50 p-3">
                <div className="flex items-center gap-2">
                  <span>{crop.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{crop.name}</span>
                  <span className="text-xs text-muted-foreground">{crop.category}</span>
                </div>
                <div className="flex gap-1">
                  <button className="rounded p-1 hover:bg-secondary" onClick={() => toast.info("Edit feature — connect Cloud")}><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  <button className="rounded p-1 hover:bg-secondary" onClick={() => toast.info("Delete feature — connect Cloud")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Markets Management */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Markets ({markets.length})</h3>
            <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground" onClick={() => toast.info("Add market — connect Cloud")}>
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {markets.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-md border border-border/50 bg-secondary/50 p-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{m.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{m.region}</span>
                </div>
                <div className="flex gap-1">
                  <button className="rounded p-1 hover:bg-secondary" onClick={() => toast.info("Edit")}><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  <button className="rounded p-1 hover:bg-secondary" onClick={() => toast.info("Delete")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price History */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-4 font-semibold text-foreground">Price Records ({prices.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2 text-left text-muted-foreground">Crop</th>
                <th className="p-2 text-left text-muted-foreground">Market</th>
                <th className="p-2 text-right text-muted-foreground">Price</th>
                <th className="p-2 text-right text-muted-foreground">Date</th>
                <th className="p-2 text-right text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.slice(0, 12).map(p => {
                const crop = crops.find(c => c.id === p.cropId);
                const market = markets.find(m => m.id === p.marketId);
                return (
                  <tr key={p.id} className="border-b border-border/30 hover:bg-secondary/30">
                    <td className="p-2 text-foreground">{crop?.emoji} {crop?.name}</td>
                    <td className="p-2 text-foreground">{market?.name}</td>
                    <td className="p-2 text-right font-mono-price font-bold text-foreground">₵{p.price}</td>
                    <td className="p-2 text-right text-muted-foreground">{p.dateRecorded}</td>
                    <td className="p-2 text-right">
                      <button className="rounded p-1 hover:bg-secondary" onClick={() => toast.info("Delete — connect Cloud")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
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
