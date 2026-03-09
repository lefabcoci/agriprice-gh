import { useState } from "react";
import { MessageSquare, Send, Zap } from "lucide-react";
import { useCrops, useMarkets, usePrices, getBestMarketForCrop } from "@/hooks/useMarketData";
import type { Crop, Market, Price } from "@/hooks/useMarketData";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  text: string;
  type: "sent" | "received";
}

const quickExamples = [
  "PRICE MAIZE ACCRA",
  "PRICE TOMATO KUMASI",
  "PRICE RICE TAMALE",
  "PRICE YAM TECHIMAN",
  "PRICE PEPPER ACCRA",
];

function parseSMSCommand(text: string, crops: Crop[], markets: Market[], prices: Price[]): string {
  const parts = text.trim().toUpperCase().split(/\s+/);
  if (parts[0] !== "PRICE" || parts.length < 3) {
    return "Invalid format. Use: PRICE [CROP] [MARKET]. Example: PRICE MAIZE ACCRA";
  }
  const cropName = parts[1];
  const marketName = parts[2];
  const crop = crops.find(c => c.name.toUpperCase() === cropName);
  const market = markets.find(m => m.name.toUpperCase() === marketName);
  if (!crop) return `Crop "${cropName}" not found. Available: ${crops.map(c => c.name).join(", ")}`;
  if (!market) return `Market "${marketName}" not found. Available: ${markets.map(m => m.name).join(", ")}`;
  const price = prices.find(p => p.crop_id === crop.id && p.market_id === market.id)?.price;
  const best = getBestMarketForCrop(crop.id, prices, markets);
  if (!price) return "Price data not available.";
  return `${crop.name} in ${market.name}: GHS ${price}/${crop.unit}. Best market today: ${best?.market?.name} GHS ${best?.price}. Powered by AgriPrice GH`;
}

const SMSDemo = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to AgriPrice GH SMS Service. Send PRICE [CROP] [MARKET] to get prices. Powered by Africa's Talking.", type: "received" },
  ]);

  const { data: crops = [], isLoading: cropsLoading } = useCrops();
  const { data: markets = [] } = useMarkets();
  const { data: prices = [], isLoading: pricesLoading } = usePrices();

  const isLoading = cropsLoading || pricesLoading;

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [...prev, { text: msg, type: "sent" }]);
    const response = parseSMSCommand(msg, crops, markets, prices);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, type: "received" }]);
    }, 500);
    setInput("");
  };

  if (isLoading) {
    return (
      <div className="container py-8 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">SMS Price Query</h1>
        <p className="text-sm text-muted-foreground">Get crop prices via SMS — works on any phone, no internet needed</p>
      </div>

      {/* Format guide */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="font-serif font-bold text-foreground mb-2">📱 How to use SMS</h3>
        <p className="text-sm text-muted-foreground">Send a text message in the format: <code className="rounded bg-card px-2 py-0.5 font-mono text-primary font-bold">PRICE [CROP] [MARKET]</code></p>
        <p className="text-xs text-muted-foreground mt-1">Example: PRICE MAIZE ACCRA → Returns current maize price in Accra market</p>
      </div>

      {/* Quick examples */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Quick Examples — click to try:</p>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map(ex => (
            <button
              key={ex}
              onClick={() => handleSend(ex)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors btn-hover"
            >
              <Zap className="h-3 w-3 text-primary" />
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SMS Simulator */}
        <div className="rounded-xl border border-border bg-card p-5 animate-slide-up">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-serif font-bold text-foreground">SMS Simulator</h3>
          </div>
          <div className="mb-4 h-80 overflow-y-auto space-y-3 rounded-lg bg-background p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                  msg.type === "sent"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="PRICE MAIZE ACCRA"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button onClick={() => handleSend()} className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground btn-hover">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Commands reference */}
        <div className="rounded-xl border border-border bg-card p-5 animate-slide-up">
          <h3 className="mb-4 font-serif font-bold text-foreground">Command Reference</h3>
          <div className="space-y-3">
            {[
              { cmd: "PRICE [CROP] [MARKET]", desc: "Get price for a specific crop at a market" },
              { cmd: "COMPARE [CROP]", desc: "Compare one crop across all markets" },
              { cmd: "BEST [CROP]", desc: "Get the best market for a crop" },
              { cmd: "HELP", desc: "Show available commands" },
            ].map(item => (
              <div key={item.cmd} className="rounded-lg border border-border bg-background p-3">
                <p className="font-mono text-sm font-bold text-primary">{item.cmd}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-foreground mb-2">Available Crops</h4>
            <div className="flex flex-wrap gap-2">
              {crops.map(c => (
                <span key={c.id} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground">{c.emoji} {c.name}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Available Markets</h4>
            <div className="flex flex-wrap gap-2">
              {markets.map(m => (
                <span key={m.id} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground">📍 {m.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSDemo;
