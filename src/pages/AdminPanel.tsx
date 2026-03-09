import { useState, useEffect } from "react";
import { Lock, Plus, Trash2, Edit2, LogOut, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCrops, useMarkets, usePrices } from "@/hooks/useMarketData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import type { Crop, Market, Price } from "@/hooks/useMarketData";

const AdminPanel = () => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Price form
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [priceCropId, setPriceCropId] = useState("");
  const [priceMarketId, setPriceMarketId] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [priceTrend, setPriceTrend] = useState<"up" | "down" | "stable">("stable");
  const [priceChangePercent, setPriceChangePercent] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Logged in successfully");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast("Logged out");
  };

  const resetPriceForm = () => {
    setPriceCropId("");
    setPriceMarketId("");
    setPriceValue("");
    setPriceTrend("stable");
    setPriceChangePercent("");
    setEditingPriceId(null);
    setShowPriceForm(false);
  };

  const handleSavePrice = async () => {
    if (!priceCropId || !priceMarketId || !priceValue) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editingPriceId) {
        const { error } = await supabase.from("prices").update({
          crop_id: priceCropId,
          market_id: priceMarketId,
          price: parseFloat(priceValue),
          trend: priceTrend,
          change_percent: parseFloat(priceChangePercent || "0"),
        }).eq("id", editingPriceId);
        if (error) throw error;
        toast.success("Price updated");
      } else {
        const { error } = await supabase.from("prices").insert({
          crop_id: priceCropId,
          market_id: priceMarketId,
          price: parseFloat(priceValue),
          trend: priceTrend,
          change_percent: parseFloat(priceChangePercent || "0"),
        });
        if (error) throw error;
        toast.success("Price added");
      }
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      resetPriceForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save price");
    }
  };

  const handleDeletePrice = async (id: string) => {
    try {
      const { error } = await supabase.from("prices").delete().eq("id", id);
      if (error) throw error;
      toast.success("Price deleted");
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const startEditPrice = (p: Price) => {
    setPriceCropId(p.crop_id);
    setPriceMarketId(p.market_id);
    setPriceValue(String(p.price));
    setPriceTrend(p.trend);
    setPriceChangePercent(String(p.change_percent));
    setEditingPriceId(p.id);
    setShowPriceForm(true);
  };

  if (authLoading) {
    return (
      <div className="container py-8 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center py-6">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-lg animate-fade-in">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-serif font-bold text-foreground">
              {isSignUp ? "Create Account" : "Admin Login"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Sign up to manage prices" : "Sign in to manage prices and data"}
            </p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground btn-hover disabled:opacity-50"
            >
              {loginLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </div>
      </div>
    );
  }

  const isLoading = cropsLoading || pricesLoading;

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage crops, markets, and prices • {session.user.email}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Crops */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif font-bold text-foreground">Crops ({crops.length})</h3>
          </div>
          <div className="space-y-2">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)
              : crops.map(crop => (
                <div key={crop.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center gap-3">
                    <img src={crop.image_url} alt={crop.name} className="h-8 w-8 rounded-md object-cover" onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop"; }} />
                    <div>
                      <span className="text-sm font-medium text-foreground">{crop.emoji} {crop.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{crop.category}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Markets */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif font-bold text-foreground">Markets ({markets.length})</h3>
          </div>
          <div className="space-y-2">
            {markets.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{m.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{m.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Form */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-foreground">Price Records ({prices.length})</h3>
          <button
            onClick={() => { resetPriceForm(); setShowPriceForm(!showPriceForm); }}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground btn-hover"
          >
            {showPriceForm ? <><X className="h-3 w-3" /> Cancel</> : <><Plus className="h-3 w-3" /> Add Price</>}
          </button>
        </div>

        {showPriceForm && (
          <div className="mb-6 rounded-lg border border-border bg-background p-4 space-y-3 animate-fade-in">
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={priceCropId} onChange={e => setPriceCropId(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                <option value="">Select Crop</option>
                {crops.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
              </select>
              <select value={priceMarketId} onChange={e => setPriceMarketId(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                <option value="">Select Market</option>
                {markets.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <input type="number" placeholder="Price (GHS)" value={priceValue} onChange={e => setPriceValue(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary" />
              <select value={priceTrend} onChange={e => setPriceTrend(e.target.value as any)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
                <option value="stable">Stable</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
              </select>
              <input type="number" step="0.1" placeholder="Change %" value={priceChangePercent} onChange={e => setPriceChangePercent(e.target.value)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary" />
            </div>
            <button onClick={handleSavePrice} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground btn-hover">
              <Save className="h-4 w-4" />
              {editingPriceId ? "Update Price" : "Add Price"}
            </button>
          </div>
        )}

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
              {prices.map(p => {
                const crop = crops.find(c => c.id === p.crop_id);
                const market = markets.find(m => m.id === p.market_id);
                return (
                  <tr key={p.id} className="border-b border-border/30 hover:bg-secondary/50 transition-colors">
                    <td className="p-3 text-foreground">{crop?.emoji} {crop?.name}</td>
                    <td className="p-3 text-foreground">{market?.name}</td>
                    <td className="p-3 text-right font-serif font-bold text-foreground">₵{p.price}</td>
                    <td className="p-3 text-right">
                      <span className={`text-xs font-bold ${p.trend === "up" ? "text-price-high" : p.trend === "down" ? "text-price-low" : "text-muted-foreground"}`}>
                        {p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "—"} {p.change_percent}%
                      </span>
                    </td>
                    <td className="p-3 text-right text-muted-foreground">{p.date_recorded}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => startEditPrice(p)}><Edit2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                        <button className="rounded-lg p-1.5 hover:bg-secondary" onClick={() => handleDeletePrice(p.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                      </div>
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
