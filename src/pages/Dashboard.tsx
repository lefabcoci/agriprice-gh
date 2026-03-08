import { Store, Wheat, TrendingUp, Clock } from "lucide-react";
import StatCard from "@/components/StatCard";
import PriceTable from "@/components/PriceTable";
import CropCard from "@/components/CropCard";
import { crops, markets, prices } from "@/data/mockData";

const Dashboard = () => {
  const avgSpread = Math.round(
    crops.reduce((sum, crop) => {
      const cp = prices.filter(p => p.cropId === crop.id);
      const max = Math.max(...cp.map(p => p.price));
      const min = Math.min(...cp.map(p => p.price));
      return sum + (max - min);
    }, 0) / crops.length
  );

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Market Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time agricultural prices across Ghana</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-medium text-primary">Live</span>
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Mar 8, 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard title="Markets Tracked" value={markets.length} icon={Store} subtitle="Across 4 regions" />
        <StatCard title="Crops Monitored" value={crops.length} icon={Wheat} subtitle="Grains, Vegetables, Tubers" />
        <StatCard title="Avg Price Spread" value={`₵${avgSpread}`} icon={TrendingUp} subtitle="Per bag across markets" />
        <StatCard title="Total Prices" value={prices.length} icon={Clock} subtitle="Updated today" />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Best Market Insights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map(crop => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Price Comparison Table</h2>
        <PriceTable />
      </div>
    </div>
  );
};

export default Dashboard;
