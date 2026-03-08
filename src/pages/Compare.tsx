import { useState } from "react";
import { crops, markets, prices, generateTrendData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const Compare = () => {
  const [selectedCrop, setSelectedCrop] = useState(crops[0].id);

  const crop = crops.find(c => c.id === selectedCrop)!;
  const cropPrices = prices
    .filter(p => p.cropId === selectedCrop)
    .map(p => ({
      market: markets.find(m => m.id === p.marketId)!.name,
      price: p.price,
      marketId: p.marketId,
    }))
    .sort((a, b) => b.price - a.price);

  const maxPrice = Math.max(...cropPrices.map(p => p.price));
  const minPrice = Math.min(...cropPrices.map(p => p.price));
  const trendData = generateTrendData(selectedCrop, "m1");

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Compare Prices</h1>
        <p className="text-sm text-muted-foreground">Select a crop to compare prices across markets</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {crops.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCrop(c.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCrop === c.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            <span>{c.emoji}</span>
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 animate-slide-up">
          <h3 className="mb-4 font-semibold text-foreground">{crop.emoji} {crop.name} — Price by Market</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cropPrices}>
              <XAxis dataKey="market" tick={{ fill: "hsl(40,25%,93%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(80,10%,55%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(135,30%,12%)", border: "1px solid hsl(135,20%,20%)", borderRadius: 8, color: "hsl(40,25%,93%)" }}
                formatter={(value: number) => [`₵${value}`, "Price"]}
              />
              <Bar dataKey="price" fill="hsl(82,74%,56%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 animate-slide-up">
          <h3 className="mb-4 font-semibold text-foreground">8-Week Trend (Accra)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(135,20%,20%)" />
              <XAxis dataKey="week" tick={{ fill: "hsl(40,25%,93%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(80,10%,55%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(135,30%,12%)", border: "1px solid hsl(135,20%,20%)", borderRadius: 8, color: "hsl(40,25%,93%)" }}
                formatter={(value: number) => [`₵${value}`, "Price"]}
              />
              <Line type="monotone" dataKey="price" stroke="hsl(82,74%,56%)" strokeWidth={2} dot={{ fill: "hsl(82,74%,56%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cropPrices.map((mp, i) => (
          <div key={mp.market} className="rounded-lg border border-border bg-card p-4 animate-fade-in">
            <div className="mb-2">
              {i === 0 && <span className="rounded-full bg-price-high px-2 py-0.5 text-xs font-bold text-price-high">BEST PRICE</span>}
              {i === cropPrices.length - 1 && <span className="rounded-full bg-price-low px-2 py-0.5 text-xs font-bold text-price-low">LOWEST</span>}
              {i > 0 && i < cropPrices.length - 1 && <span className="rounded-full bg-price-mid px-2 py-0.5 text-xs font-bold text-price-mid">MID RANGE</span>}
            </div>
            <h4 className="font-semibold text-foreground">{mp.market}</h4>
            <p className="mt-1 text-2xl font-bold font-mono-price text-foreground">₵{mp.price}</p>
            <p className="text-xs text-muted-foreground">per bag</p>
            <div className="mt-2 h-1.5 rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(mp.price / maxPrice) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compare;
