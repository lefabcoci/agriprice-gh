import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import type { Crop, Market, Price } from "@/hooks/useMarketData";
import { getBestMarketForCrop } from "@/hooks/useMarketData";

interface CropCardProps {
  crop: Crop;
  prices: Price[];
  markets: Market[];
}

const CropCard = ({ crop, prices, markets }: CropCardProps) => {
  const best = getBestMarketForCrop(crop.id, prices, markets);
  const priceData = prices.find(p => p.crop_id === crop.id && p.market_id === best?.market?.id);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden card-hover animate-fade-in">
      <div className="relative h-44 overflow-hidden">
        <img
          src={crop.image_url}
          alt={crop.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {priceData && (
          <div className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            priceData.trend === "up" ? "bg-price-high text-price-high" :
            priceData.trend === "down" ? "bg-price-low text-price-low" :
            "bg-price-mid text-price-mid"
          }`}>
            {priceData.trend === "up" && <TrendingUp className="h-3 w-3" />}
            {priceData.trend === "down" && <TrendingDown className="h-3 w-3" />}
            {priceData.trend === "stable" && <Minus className="h-3 w-3" />}
            {priceData.change_percent}%
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{crop.category}</span>
        </div>
        <h3 className="font-serif font-bold text-lg text-foreground">{crop.emoji} {crop.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{crop.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Best Price</p>
            <p className="font-serif text-2xl font-bold text-primary">₵{best?.price}</p>
            <p className="text-xs text-muted-foreground">at {best?.market?.name}</p>
          </div>
          <Link
            to="/compare"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-hover"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
