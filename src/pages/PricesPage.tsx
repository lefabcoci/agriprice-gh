import { useState } from "react";
import { crops, markets, getPriceForCropMarket, getBestMarketForCrop, getWorstMarketForCrop, prices } from "@/data/mockData";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const PricesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("all");

  const filtered = crops.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Market Prices</h1>
        <p className="text-sm text-muted-foreground">Today's prices across all major markets in Ghana</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {[{ id: "all", name: "All Markets" }, ...markets].map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedMarket(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors btn-hover ${
              selectedMarket === m.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {m.id !== "all" && "📍 "}{m.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Crop cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map(crop => {
          const best = getBestMarketForCrop(crop.id);
          const worst = getWorstMarketForCrop(crop.id);

          return (
            <div key={crop.id} className="rounded-xl border border-border bg-card overflow-hidden card-hover animate-fade-in">
              <div className="relative h-36 overflow-hidden">
                <img src={crop.imageUrl} alt={crop.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-foreground">{crop.emoji} {crop.name}</h3>
                <p className="text-xs text-muted-foreground">{crop.unit}</p>

                <div className="mt-3 space-y-1.5">
                  {markets
                    .filter(m => selectedMarket === "all" || m.id === selectedMarket)
                    .map(market => {
                      const price = getPriceForCropMarket(crop.id, market.id);
                      const isBest = best?.market?.id === market.id;
                      const isWorst = worst?.market?.id === market.id;
                      const priceData = prices.find(p => p.cropId === crop.id && p.marketId === market.id);

                      return (
                        <div key={market.id} className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm ${
                          isBest ? "bg-price-high" : isWorst ? "bg-price-low" : "bg-background"
                        }`}>
                          <span className="text-foreground">{market.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-serif font-bold ${isBest ? "text-price-high" : isWorst ? "text-price-low" : "text-foreground"}`}>
                              ₵{price}
                            </span>
                            {priceData?.trend === "up" && <TrendingUp className="h-3 w-3 text-price-high" />}
                            {priceData?.trend === "down" && <TrendingDown className="h-3 w-3 text-price-low" />}
                            {priceData?.trend === "stable" && <Minus className="h-3 w-3 text-muted-foreground" />}
                          </div>
                        </div>
                      );
                    })}
                </div>

                <Link
                  to="/compare"
                  className="mt-3 block text-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground btn-hover"
                >
                  Compare →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricesPage;
