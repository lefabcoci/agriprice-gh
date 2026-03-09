import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus, MapPin, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useCrops, useMarkets, usePrices, getBestMarketForCrop, getWorstMarketForCrop, getPriceForCropMarket } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";

const PricesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  const isLoading = cropsLoading || pricesLoading;
  const categories = ["all", ...Array.from(new Set(crops.map(c => c.category)))];

  const filtered = crops.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "all" || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen">
      {/* Page header banner */}
      <div className="relative bg-primary overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=400&fit=crop&q=80"
          alt="Ghana market"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        <div className="container relative py-12 z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">Market Prices</h1>
          <p className="text-primary-foreground/70 mt-1 text-sm md:text-base">
            Today's prices across all major markets in Ghana
          </p>
        </div>
      </div>

      <div className="container py-8 space-y-6">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 flex-1 max-w-sm shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search crops..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-wrap">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Market filter chips with images */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMarket("all")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors btn-hover ${
              selectedMarket === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            All Markets
          </button>
          {markets.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMarket(m.id)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors btn-hover ${
                selectedMarket === m.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {m.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> crops
          </p>
        )}

        {/* Crop grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-2xl" />
              ))
            : filtered.map(crop => {
                const best = getBestMarketForCrop(crop.id, prices, markets);
                const worst = getWorstMarketForCrop(crop.id, prices, markets);
                const marketsToShow = markets.filter(m => selectedMarket === "all" || m.id === selectedMarket);

                return (
                  <div key={crop.id} className="rounded-2xl border border-border bg-card overflow-hidden card-hover animate-fade-in shadow-sm group">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={crop.image_url}
                        alt={crop.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=340&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className="rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                          {crop.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-serif font-bold text-white text-lg leading-tight drop-shadow-sm">
                          {crop.emoji} {crop.name}
                        </h3>
                        <p className="text-white/70 text-xs">per {crop.unit}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Prices per market */}
                      <div className="space-y-1.5 mb-4">
                        {marketsToShow.map(market => {
                          const price = getPriceForCropMarket(crop.id, market.id, prices);
                          const isBest = best?.market?.id === market.id;
                          const isWorst = worst?.market?.id === market.id;
                          const priceData = prices.find(p => p.crop_id === crop.id && p.market_id === market.id);

                          return (
                            <div
                              key={market.id}
                              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                                isBest ? "bg-price-high" : isWorst ? "bg-price-low" : "bg-background"
                              }`}
                            >
                              <span className={`font-medium ${isBest ? "text-price-high" : isWorst ? "text-price-low" : "text-foreground"}`}>
                                {market.name}
                                {isBest && <span className="ml-1.5 text-[10px] font-bold">★ BEST</span>}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className={`font-serif font-bold ${isBest ? "text-price-high" : isWorst ? "text-price-low" : "text-foreground"}`}>
                                  {price ? `₵${price}` : "—"}
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
                        className="block w-full rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground btn-hover"
                      >
                        Compare →
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl mb-3">🌾</p>
            <p className="font-serif text-xl font-bold text-foreground">No crops found</p>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricesPage;
