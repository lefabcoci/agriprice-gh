import { useState } from "react";
import { crops, markets, prices, generateTrendData, getBestMarketForCrop } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Star } from "lucide-react";

const Compare = () => {
  const [selectedCrop, setSelectedCrop] = useState(crops[0].id);

  const crop = crops.find(c => c.id === selectedCrop)!;
  const cropPrices = prices
    .filter(p => p.cropId === selectedCrop)
    .map(p => ({
      market: markets.find(m => m.id === p.marketId)!.name,
      price: p.price,
      marketId: p.marketId,
      trend: p.trend,
      changePercent: p.changePercent,
    }))
    .sort((a, b) => b.price - a.price);

  const maxPrice = Math.max(...cropPrices.map(p => p.price));
  const trendData = generateTrendData(selectedCrop, "m1");
  const best = getBestMarketForCrop(selectedCrop);

  return (
    <div className="space-y-8">
      {/* Hero banner for selected crop */}
      <div className="relative h-64 overflow-hidden">
        <img src={crop.imageUrl} alt={crop.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container">
          <h1 className="text-4xl font-serif font-bold text-card mb-2">{crop.emoji} {crop.name}</h1>
          <p className="text-card/80">Best price: <span className="font-serif font-bold text-accent">₵{best?.price}</span> at {best?.market?.name}</p>
        </div>
      </div>

      <div className="container space-y-8">
        {/* Crop selector pills with images */}
        <div className="flex flex-wrap gap-2">
          {crops.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCrop(c.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all btn-hover ${
                selectedCrop === c.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <img src={c.imageUrl} alt={c.name} className="h-6 w-6 rounded-full object-cover" />
              {c.name}
            </button>
          ))}
        </div>

        {/* Market Price Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cropPrices.map((mp, i) => (
            <div
              key={mp.market}
              className={`rounded-xl border p-5 card-hover animate-fade-in ${
                i === 0
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {i === 0 && (
                <div className="mb-3 flex items-center gap-1.5 text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs font-bold uppercase">Best Price</span>
                </div>
              )}
              {i === cropPrices.length - 1 && (
                <div className="mb-3">
                  <span className="rounded-full bg-price-low px-2.5 py-1 text-xs font-bold text-price-low">LOWEST</span>
                </div>
              )}
              {i > 0 && i < cropPrices.length - 1 && (
                <div className="mb-3">
                  <span className="rounded-full bg-price-mid px-2.5 py-1 text-xs font-bold text-price-mid">MID RANGE</span>
                </div>
              )}
              <h4 className="font-serif font-bold text-lg text-foreground">📍 {mp.market}</h4>
              <p className="mt-2 text-3xl font-serif font-bold text-foreground">₵{mp.price}</p>
              <p className="text-xs text-muted-foreground">per {crop.unit}</p>
              <div className="mt-3 h-2 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(mp.price / maxPrice) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 animate-slide-up">
            <h3 className="mb-4 font-serif font-bold text-foreground">{crop.emoji} {crop.name} — Price by Market</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={cropPrices}>
                <XAxis dataKey="market" tick={{ fill: "hsl(150,10%,45%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(150,10%,45%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(36,15%,82%)", borderRadius: 8 }}
                  formatter={(value: number) => [`₵${value}`, "Price"]}
                />
                <Bar dataKey="price" fill="hsl(110,60%,30%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 animate-slide-up">
            <h3 className="mb-4 font-serif font-bold text-foreground">8-Week Price Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(36,15%,82%)" />
                <XAxis dataKey="week" tick={{ fill: "hsl(150,10%,45%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(150,10%,45%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(36,15%,82%)", borderRadius: 8 }}
                  formatter={(value: number) => [`₵${value}`, "Price"]}
                />
                <Line type="monotone" dataKey="price" stroke="hsl(100,55%,52%)" strokeWidth={3} dot={{ fill: "hsl(110,60%,30%)", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
