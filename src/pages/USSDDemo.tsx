import { useState } from "react";
import { Phone } from "lucide-react";
import { crops, markets, getPriceForCropMarket, getBestMarketForCrop } from "@/data/mockData";

type Screen = "welcome" | "selectCrop" | "viewPrices";

const USSDDemo = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedCropId, setSelectedCropId] = useState("");
  const [inputVal, setInputVal] = useState("");

  const handleInput = () => {
    const val = inputVal.trim();
    setInputVal("");

    if (screen === "welcome") {
      if (val === "1") setScreen("selectCrop");
      else if (val === "0") setScreen("welcome");
    } else if (screen === "selectCrop") {
      const idx = parseInt(val) - 1;
      if (idx >= 0 && idx < crops.length) {
        setSelectedCropId(crops[idx].id);
        setScreen("viewPrices");
      }
    } else if (screen === "viewPrices") {
      if (val === "0") {
        setScreen("welcome");
        setSelectedCropId("");
      } else if (val === "1") {
        setScreen("selectCrop");
      }
    }
  };

  const renderScreen = () => {
    if (screen === "welcome") {
      return (
        <>
          <p className="mb-3 text-sm text-foreground">Welcome to AgriPrice GH</p>
          <p className="text-xs text-muted-foreground">1. Check Prices</p>
          <p className="text-xs text-muted-foreground">2. Compare Markets</p>
          <p className="text-xs text-muted-foreground">0. Exit</p>
        </>
      );
    }
    if (screen === "selectCrop") {
      return (
        <>
          <p className="mb-3 text-sm text-foreground">Select Crop:</p>
          {crops.map((c, i) => (
            <p key={c.id} className="text-xs text-muted-foreground">{i + 1}. {c.emoji} {c.name}</p>
          ))}
        </>
      );
    }
    if (screen === "viewPrices") {
      const crop = crops.find(c => c.id === selectedCropId)!;
      const best = getBestMarketForCrop(crop.id);
      return (
        <>
          <p className="mb-2 text-sm font-semibold text-foreground">{crop.emoji} {crop.name} Prices</p>
          {markets.map(m => {
            const price = getPriceForCropMarket(crop.id, m.id);
            const isBest = best?.market?.id === m.id;
            return (
              <p key={m.id} className={`text-xs ${isBest ? "text-price-high font-bold" : "text-muted-foreground"}`}>
                {m.name}: ₵{price}{isBest ? " ★ BEST" : ""}
              </p>
            );
          })}
          <p className="mt-3 text-xs text-muted-foreground">1. Back  0. Home</p>
        </>
      );
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">USSD Demo</h1>
        <p className="text-sm text-muted-foreground">Simulate USSD session — Dial *384#</p>
      </div>

      <div className="flex justify-center">
        <div className="w-72 animate-slide-up">
          {/* Phone mockup */}
          <div className="rounded-[2rem] border-4 border-border bg-card p-4 shadow-2xl">
            <div className="mb-3 flex justify-center">
              <div className="h-1.5 w-16 rounded-full bg-border" />
            </div>

            <div className="rounded-xl bg-secondary p-4 min-h-[280px] flex flex-col">
              <div className="mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-mono-price text-xs text-primary">*384#</span>
              </div>

              <div className="flex-1 space-y-1">
                {renderScreen()}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleInput()}
                  placeholder="Enter option..."
                  className="flex-1 rounded-md border border-border bg-card px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
                <button onClick={handleInput} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  Send
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDDemo;
