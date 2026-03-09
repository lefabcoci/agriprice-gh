import { Store, Wheat, Smartphone, TrendingDown, ArrowRight, MapPin } from "lucide-react";
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
    <div className="min-h-screen">
      <HeroSection />

      {/* Stats Section */}
      <section className="relative z-20 -mt-8 container px-4 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard title="Markets Tracked" value={markets.length || "—"} icon={Store} subtitle="Across Ghana" />
          <StatCard title="Crops Monitored" value={crops.length || "—"} icon={Wheat} subtitle="Updated daily" />
          <StatCard title="SMS & USSD" value="Free" icon={Smartphone} subtitle="Works offline" />
          <StatCard title="Middlemen Cut" value="65%" icon={TrendingDown} subtitle="Saved by farmers" />
        </div>
      </section>

      {/* Top Prices Section */}
      <section className="container py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-bold text-foreground">Trending Crops</h2>
            <p className="text-muted-foreground mt-2">Check today's most volatile and traded commodities across the regions.</p>
          </div>
          <Link to="/prices" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
            View All Market Prices <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))
            : crops.slice(0, 8).map(crop => (
                <CropCard key={crop.id} crop={crop} prices={prices} markets={markets} />
              ))}
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
                  Built for Every Farmer
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-md">
                  Whether you have a smartphone or a basic feature phone, getting fair market prices has never been easier.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { step: "1", icon: "🌐", title: "Browse on Web", desc: "Use agriprice.gh to see live price boards, trends, and charts for all crops." },
                  { step: "2", icon: "💬", title: "Send an SMS", desc: "Text PRICE MAIZE ACCRA to 1900 to get instant updates without using data." },
                  { step: "3", icon: "📱", title: "Dial USSD", desc: "Dial *384# on any phone — no internet needed, works on all networks." },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-5 items-start group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold text-xl shadow-lg transition-transform group-hover:-translate-y-1">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary-foreground text-xl flex items-center gap-2">
                        <span>{item.icon}</span> {item.title}
                      </h3>
                      <p className="text-primary-foreground/70 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl" />
              
              <div className="rounded-3xl bg-card/10 backdrop-blur-md p-8 border border-white/10 shadow-2xl relative">
                <div className="rounded-2xl bg-card p-6 shadow-inner">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <span className="font-bold text-foreground">SMS Demo</span>
                    </div>
                    <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">12:45 PM</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm max-w-[85%]">
                        PRICE MAIZE ACCRA
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground shadow-sm max-w-[90%] leading-relaxed">
                        🌽 <span className="font-bold">Maize in Accra</span><br/>
                        Today's price: GHS 400/bag.<br/><br/>
                        💡 Best alternative market:<br/>
                        Techiman - GHS 420/bag.<br/><br/>
                        <span className="text-xs opacity-70">Powered by AgriPrice GH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="container py-20">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground">Browse by Region</h2>
            <p className="text-muted-foreground mt-2">Track prices across major agricultural hubs.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market, i) => (
            <Link to="/prices" key={market.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] card-hover shadow-sm">
              <img
                src={market.image_url || `https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&q=80&sig=${i}`}
                alt={market.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{market.region}</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-white drop-shadow-md">{market.name}</h3>
                <p className="text-sm text-white/80 mt-1 line-clamp-1">{market.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
