import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { useCrops, useMarkets, usePrices, getBestMarketForCrop } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const { data: crops = [] } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading } = usePrices();

  const topCrops = crops.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-primary min-h-[560px] flex items-center">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&h=900&fit=crop&q=80"
        alt="Ghana farm"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Strong gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/80 to-transparent" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: copy */}
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Live prices — updated today
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight">
              Know Your Crop's Worth{" "}
              <span className="text-accent italic">Before You Sell</span>
            </h1>

            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed">
              Compare real-time agricultural market prices across Ghana.
              Available on Web, SMS, and USSD — so every farmer can access fair prices.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/prices"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-lg btn-hover"
              >
                Check Prices Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ussd"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              >
                📱 Dial *384#
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[`${markets.length || "—"} Markets`, `${crops.length || "—"} Crops`, "Free SMS & USSD"].map(stat => (
                <div key={stat} className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {stat}
                </div>
              ))}
            </div>
          </div>

          {/* Right: live price card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-card/95 backdrop-blur-md shadow-2xl border border-border/50 overflow-hidden max-w-sm ml-auto animate-slide-up">
              <div className="bg-primary/5 border-b border-border px-5 py-3.5 flex items-center justify-between">
                <h3 className="font-serif font-bold text-foreground">Top Prices Today</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Live</span>
              </div>
              <div className="p-4 space-y-2">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-xl" />
                    ))
                  : topCrops.map((crop) => {
                      const best = getBestMarketForCrop(crop.id, prices, markets);
                      const priceData = prices.find(
                        (p) => p.crop_id === crop.id && p.market_id === best?.market?.id
                      );
                      return (
                        <div key={crop.id} className="flex items-center gap-3 rounded-xl bg-background px-3 py-2.5 group/row hover:bg-secondary transition-colors">
                          {/* Crop thumbnail */}
                          <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                            <img
                              src={crop.image_url}
                              alt={crop.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {crop.emoji} {crop.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {best?.market?.name ?? "—"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-serif font-bold text-foreground">
                              {best?.price ? `₵${best.price}` : "—"}
                            </span>
                            {priceData?.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-price-high" />}
                            {priceData?.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-price-low" />}
                            {priceData?.trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div className="border-t border-border px-5 py-3 text-center">
                <Link to="/prices" className="text-xs font-semibold text-primary hover:underline">
                  View all prices →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
