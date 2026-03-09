import { useState } from "react";
import { Search } from "lucide-react";
import { useCrops, useMarkets, usePrices, getPriceForCropMarket, getBestMarketForCrop, getWorstMarketForCrop } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";

const PriceTable = () => {
  const [search, setSearch] = useState("");
  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  const isLoading = cropsLoading || pricesLoading;
  const filtered = crops.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="rounded-lg border border-border bg-card animate-slide-up">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left font-medium text-muted-foreground">Crop</th>
                {markets.map(m => (
                  <th key={m.id} className="p-3 text-right font-medium text-muted-foreground">{m.name}</th>
                ))}
                <th className="p-3 text-right font-medium text-muted-foreground">Best</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(crop => {
                const best = getBestMarketForCrop(crop.id, prices, markets);
                const worst = getWorstMarketForCrop(crop.id, prices, markets);
                return (
                  <tr key={crop.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="p-3 font-medium">
                      <span className="mr-2">{crop.emoji}</span>{crop.name}
                    </td>
                    {markets.map(market => {
                      const price = getPriceForCropMarket(crop.id, market.id, prices);
                      const isBest = best?.market?.id === market.id;
                      const isWorst = worst?.market?.id === market.id;
                      return (
                        <td key={market.id} className="p-3 text-right">
                          <span className={`font-mono-price font-bold ${
                            isBest ? "text-price-high" : isWorst ? "text-price-low" : "text-foreground"
                          }`}>
                            {price ? `₵${price}` : "—"}
                          </span>
                          {isBest && <span className="ml-1 text-xs text-price-high">↑</span>}
                          {isWorst && <span className="ml-1 text-xs text-price-low">↓</span>}
                        </td>
                      );
                    })}
                    <td className="p-3 text-right">
                      <span className="rounded-full bg-price-high px-2 py-0.5 text-xs font-bold text-price-high">
                        {best?.market?.name}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PriceTable;
