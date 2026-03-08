import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { crops, markets, prices, getBestMarketForCrop } from "@/data/mockData";

const HeroSection = () => {
  const topCrops = crops.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />

      <div className="container relative py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm text-primary-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Live prices updated today
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight">
              Know Your Crop's Worth{" "}
              <span className="text-accent">Before You Sell</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg">
              Compare real-time agricultural market prices across Ghana. Available on Web, SMS, and USSD for every farmer.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/prices"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground btn-hover"
              >
                Check Prices Now →
              </Link>
              <Link
                to="/ussd"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                📱 Dial *384#
              </Link>
            </div>
          </div>

          {/* Floating live price card */}
          <div className="hidden lg:block">
            <div className="rounded-xl bg-card shadow-2xl p-6 max-w-sm ml-auto animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-foreground">Top Prices Today</h3>
                <span className="text-xs text-muted-foreground">Mar 8, 2026</span>
              </div>
              <div className="space-y-3">
                {topCrops.map(crop => {
                  const best = getBestMarketForCrop(crop.id);
                  const priceData = prices.find(p => p.cropId === crop.id && p.marketId === best?.market?.id);
                  return (
                    <div key={crop.id} className="flex items-center justify-between rounded-lg bg-background p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{crop.emoji}</span>
                        <span className="text-sm font-medium text-foreground">{crop.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-foreground">₵{best?.price}</span>
                        {priceData?.trend === "up" && <TrendingUp className="h-4 w-4 text-price-high" />}
                        {priceData?.trend === "down" && <TrendingDown className="h-4 w-4 text-price-low" />}
                        {priceData?.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
