import { Crop, getBestMarketForCrop, getWorstMarketForCrop } from "@/data/mockData";
import { TrendingUp } from "lucide-react";

interface CropCardProps {
  crop: Crop;
}

const CropCard = ({ crop }: CropCardProps) => {
  const best = getBestMarketForCrop(crop.id);
  const worst = getWorstMarketForCrop(crop.id);
  const spread = best && worst ? best.price - worst.price : 0;
  const spreadPct = worst ? ((spread / worst.price) * 100).toFixed(1) : "0";

  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{crop.emoji}</span>
          <div>
            <h3 className="font-semibold text-foreground">{crop.name}</h3>
            <p className="text-xs text-muted-foreground">{crop.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-price-high">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-bold">+{spreadPct}%</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Best Market</p>
          <p className="font-mono-price font-bold text-price-high">₵{best?.price} <span className="text-xs font-normal text-muted-foreground">at {best?.market?.name}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Lowest</p>
          <p className="font-mono-price font-bold text-price-low">₵{worst?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
