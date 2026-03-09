import { Store, Wheat, Smartphone, TrendingDown } from "lucide-react";
import StatCard from "@/components/StatCard";
import CropCard from "@/components/CropCard";
import HeroSection from "@/components/HeroSection";
import { useCrops, useMarkets, usePrices } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  const isLoading = cropsLoading || pricesLoading;

  return (
    <div>
      <HeroSection />

      <section className="container py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="Markets Tracked" value={markets.length || "—"} icon={Store} subtitle="Across 4 regions" />
          <StatCard title="Crops Monitored" value={crops.length || "—"} icon={Wheat} subtitle="Updated daily" />
          <StatCard title="SMS & USSD" value="Free" icon={Smartphone} subtitle="Works on any phone" />
          <StatCard title="Middlemen Cut" value="65%" icon={TrendingDown} subtitle="Saved by farmers" />
        </div>
      </section>

      <section className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Today's Top Prices</h2>
            <p className="text-sm text-muted-foreground">Compare prices across Ghana's major markets</p>
          </div>
          <Link to="/prices" className="text-sm font-semibold text-primary hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))
            : crops.slice(0, 8).map(crop => (
                <CropCard key={crop.id} crop={crop} prices={prices} markets={markets} />
              ))}
        </div>
      </section>

      <section className="bg-primary mt-10">
        <div className="container py-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-8">How It Works</h2>
              <div className="space-y-6">
                {[
                  { step: "1", icon: "🌐", title: "Browse on Web", desc: "Visit agriprice.gh to see live prices for all crops across markets" },
                  { step: "2", icon: "💬", title: "Send an SMS", desc: "Text PRICE MAIZE ACCRA to get instant price updates on your phone" },
                  { step: "3", icon: "📱", title: "Dial USSD", desc: "Dial *384# on any phone — no internet needed, no data costs" },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary-foreground text-lg">{item.icon} {item.title}</h3>
                      <p className="text-primary-foreground/70 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-xl bg-card/10 backdrop-blur p-6 border border-primary-foreground/20">
                <div className="rounded-lg bg-card p-4 shadow-lg">
                  <p className="text-xs text-muted-foreground mb-2">SMS Example</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
                      → PRICE MAIZE ACCRA
                    </div>
                    <div className="rounded-lg bg-background px-3 py-2 text-sm text-foreground">
                      ← Maize in Accra: GHS 400/bag. Best market today: Techiman GHS 420. Powered by AgriPrice GH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Browse by Region</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map(market => (
            <Link to="/prices" key={market.id} className="group relative rounded-xl overflow-hidden h-48 card-hover">
              <img
                src={market.image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"}
                alt={market.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-serif font-bold text-xl text-card">📍 {market.name}</h3>
                <p className="text-sm text-card/80">{market.region} — {market.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
