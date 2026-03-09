import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCrops, useMarkets, usePrices, getBestMarketForCrop, generateTrendData } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";

const Compare = () => {
  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const isLoading = cropsLoading || pricesLoading;
  const activeCropId = selectedCrop || crops[0]?.id;
  const crop = crops.find(c => c.id === activeCropId);

  const cropPrices = prices
    .filter(p => p.crop_id === activeCropId)
    .map(p => ({
      market: markets.find(m => m.id === p.market_id)?.name ?? "Unknown",
      price: Number(p.price),
      marketId: p.market_id,
      trend: p.trend,
      changePercent: p.change_percent,
    }))
    .sort((a, b) => b.price - a.price);

  const maxPrice = Math.max(...cropPrices.map(p => p.price), 1);
  const trendData = activeCropId && markets[0] ? generateTrendData(activeCropId, markets[0].id, prices) : [];
  const best = activeCropId ? getBestMarketForCrop(activeCropId, prices, markets) : null;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px] w-full" />
        <div className="container space-y-8 pb-20">
          <div className="flex gap-2"><Skeleton className="h-10 w-32 rounded-full" /><Skeleton className="h-10 w-32 rounded-full" /></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!crop) return <div className="container py-20 text-center text-muted-foreground font-medium">No crop data available for comparison.</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-primary">
        <img
          src={crop.image_url}
          alt={crop.name}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1600&h=600&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 container z-10 translate-y-4">
          <div className="bg-card/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50 max-w-3xl">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3 inline-block">
              {crop.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-5xl">{crop.emoji}</span> {crop.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 border-t border-border">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Highest Payer</p>
                <p className="font-serif text-2xl font-bold text-primary mt-1">
                  {best?.price ? `₵${best.price}` : "—"}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/ {crop.unit}</span>
                </p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-border" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Top Market</p>
                <p className="font-serif text-xl font-bold text-foreground mt-1 flex items-center gap-2">
                  📍 {best?.market?.name ?? "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-12 mt-16">
        {/* Crop Selector */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Select Crop to Compare</h3>
          <div className="flex flex-wrap gap-2.5">
            {crops.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCrop(c.id)}
                className={`flex items-center gap-2.5 rounded-full pl-2 pr-4 py-1.5 text-sm font-medium transition-all shadow-sm ${
                  activeCropId === c.id
                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "border border-border bg-card text-foreground hover:bg-secondary hover:border-muted-foreground/30"
                }`}
              >
                <img
                  src={c.image_url}
                  alt={c.name}
                  className="h-8 w-8 rounded-full object-cover bg-muted"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop";
                  }}
                />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cropPrices.map((mp, i) => (
            <div
              key={mp.market}
              className={`relative overflow-hidden rounded-2xl border p-6 card-hover animate-fade-in ${
                i === 0
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md"
                  : "border-border bg-card shadow-sm"
              }`}
            >
              {i === 0 && (
                <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1.5 flex items-center gap-1 text-primary-foreground">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Top Price</span>
                </div>
              )}

              <div className="mb-2">
                <h4 className="font-serif font-bold text-lg text-foreground truncate pr-20">{mp.market}</h4>
              </div>
              
              <div className="flex items-end gap-2 mb-1">
                <p className="text-4xl font-serif font-bold text-foreground">₵{mp.price}</p>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-muted-foreground">per {crop.unit}</p>
                <div className={`flex items-center gap-1 text-xs font-bold ${
                  mp.trend === 'up' ? 'text-price-high' : mp.trend === 'down' ? 'text-price-low' : 'text-price-mid'
                }`}>
                  {mp.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {mp.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                  {mp.trend === 'stable' && <Minus className="h-3 w-3" />}
                  {mp.changePercent}%
                </div>
              </div>

              {/* Progress bar relative to max price */}
              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Relative value</span>
                  <span>{Math.round((mp.price / maxPrice) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-primary' : 'bg-primary/60'}`}
                    style={{ width: `${(mp.price / maxPrice) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-slide-up">
            <div className="mb-6">
              <h3 className="font-serif font-bold text-xl text-foreground">Market Comparison</h3>
              <p className="text-sm text-muted-foreground">Current prices across all active regions</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cropPrices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="market" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₵${val}`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(value: number) => [`₵${value}`, "Price"]}
                />
                <Bar dataKey="price" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="mb-6">
              <h3 className="font-serif font-bold text-xl text-foreground">8-Week Price Trend</h3>
              <p className="text-sm text-muted-foreground">Historical trajectory for top market</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₵${val}`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(value: number) => [`₵${value}`, "Average Price"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={4} 
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5, stroke: "hsl(var(--card))" }} 
                  activeDot={{ r: 7, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
