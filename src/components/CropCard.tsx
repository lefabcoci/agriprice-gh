import { TrendingUp, TrendingDown, Minus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Crop, Market, Price } from "@/hooks/useMarketData";
import { getBestMarketForCrop } from "@/hooks/useMarketData";

interface CropCardProps {
  crop: Crop;
  prices: Price[];
  markets: Market[];
}

const trendConfig = {
  up: { icon: TrendingUp, bg: "bg-price-high", text: "text-price-high", label: "Rising" },
  down: { icon: TrendingDown, bg: "bg-price-low", text: "text-price-low", label: "Falling" },
  stable: { icon: Minus, bg: "bg-price-mid", text: "text-price-mid", label: "Stable" },
};

const CropCard = ({ crop, prices, markets }: CropCardProps) => {
  const best = getBestMarketForCrop(crop.id, prices, markets);
  const priceData = prices.find(p => p.crop_id === crop.id && p.market_id === best?.market?.id);
  const trend = priceData?.trend as keyof typeof trendConfig | undefined;
  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden card-hover animate-fade-in shadow-sm">
      {/* Image with fixed aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={crop.image_url}
          alt={crop.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&q=80`;
          }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category chip top-left */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
            {crop.category}
          </span>
        </div>

        {/* Trend badge top-right */}
        {trend && TrendIcon && (
          <div className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold backdrop-blur-sm ${trendConfig[trend].bg} ${trendConfig[trend].text}`}>
            <TrendIcon className="h-3 w-3" />
            {priceData?.change_percent}%
          </div>
        )}

        {/* Crop emoji + name pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif font-bold text-lg text-white leading-tight drop-shadow-sm">
            {crop.emoji} {crop.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">{crop.description}</p>

        <div className="rounded-xl bg-background p-3 mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Best Price</p>
            <p className="font-serif text-2xl font-bold text-primary leading-none mt-0.5">
              {best?.price ? `₵${best.price}` : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">per {crop.unit}</p>
          </div>
          {best?.market && (
            <div className="text-right">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground ml-auto mb-0.5" />
              <p className="text-xs font-semibold text-foreground">{best.market.name}</p>
              <p className="text-[10px] text-muted-foreground">{best.market.region}</p>
            </div>
          )}
        </div>

        <Link
          to="/compare"
          className="block w-full rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground btn-hover"
        >
          Compare Markets →
        </Link>
      </div>
    </div>
  );
};

export default CropCard;
