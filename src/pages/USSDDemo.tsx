import { useState } from "react";
import { Phone, Check, ChevronRight } from "lucide-react";
import { crops, markets, getPriceForCropMarket, getBestMarketForCrop } from "@/data/mockData";

type Screen = "welcome" | "selectCrop" | "viewPrices";

const steps = [
  { num: 1, title: "Dial *384#", desc: "Enter the USSD code on your phone" },
  { num: 2, title: "Select Option", desc: "Choose Check Prices from the menu" },
  { num: 3, title: "Pick a Crop", desc: "Select from the list of available crops" },
  { num: 4, title: "View Prices", desc: "See prices across all 4 markets" },
];

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
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">AgriPrice GH</p>
          <p className="text-xs text-muted-foreground">Welcome! Choose an option:</p>
          <div className="mt-2 space-y-0.5">
            <p className="text-xs text-foreground">1. Check Prices</p>
            <p className="text-xs text-foreground">2. Compare Markets</p>
            <p className="text-xs text-foreground">3. Price Alerts</p>
            <p className="text-xs text-foreground">0. Exit</p>
          </div>
        </div>
      );
    }
    if (screen === "selectCrop") {
      return (
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">Select Crop:</p>
          {crops.map((c, i) => (
            <p key={c.id} className="text-xs text-foreground">{i + 1}. {c.emoji} {c.name}</p>
          ))}
        </div>
      );
    }
    if (screen === "viewPrices") {
      const crop = crops.find(c => c.id === selectedCropId)!;
      const best = getBestMarketForCrop(crop.id);
      return (
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">{crop.emoji} {crop.name} Prices</p>
          {markets.map(m => {
            const price = getPriceForCropMarket(crop.id, m.id);
            const isBest = best?.market?.id === m.id;
            return (
              <p key={m.id} className={`text-xs ${isBest ? "text-price-high font-bold" : "text-foreground"}`}>
                {m.name}: ₵{price}/{crop.unit} {isBest ? "✓ BEST" : ""}
              </p>
            );
          })}
          <p className="mt-2 text-xs text-muted-foreground">1. Back  0. Home</p>
        </div>
      );
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">USSD Service</h1>
        <p className="text-sm text-muted-foreground">Interactive USSD menu — works on any phone without internet</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="w-72 animate-slide-up">
            <div className="rounded-[2.5rem] border-[6px] border-foreground/20 bg-card p-4 shadow-2xl">
              {/* Notch */}
              <div className="mb-3 flex justify-center">
                <div className="h-5 w-24 rounded-full bg-foreground/10" />
              </div>

              <div className="rounded-2xl bg-background p-4 min-h-[340px] flex flex-col">
                <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold text-primary">*384#</span>
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
                    className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                  <button onClick={handleInput} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground btn-hover">
                    Send
                  </button>
                </div>
              </div>

              {/* Home bar */}
              <div className="mt-3 flex justify-center">
                <div className="h-1 w-28 rounded-full bg-foreground/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">📱 Dial *384#</h2>
            <p className="text-sm text-muted-foreground mb-4">Access real-time crop prices on any mobile phone — no smartphone or data required.</p>

            <div className="space-y-2">
              {["No internet connection needed", "Works on every phone", "Free to use — no data charges", "Prices updated daily", "Covers all major markets"].map(feat => (
                <div key={feat} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step flow */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-serif font-bold text-foreground mb-4">How it works</h3>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mt-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDDemo;
