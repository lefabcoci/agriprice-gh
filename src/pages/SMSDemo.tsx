import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { parseSMSCommand, crops, markets } from "@/data/mockData";

interface Message {
  text: string;
  type: "sent" | "received";
}

const SMSDemo = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to AgriPrice GH SMS. Send PRICE [CROP] [MARKET] to get prices.", type: "received" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const sent = input.trim();
    setMessages(prev => [...prev, { text: sent, type: "sent" }]);
    const response = parseSMSCommand(sent);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, type: "received" }]);
    }, 500);
    setInput("");
  };

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SMS Demo</h1>
        <p className="text-sm text-muted-foreground">Simulate SMS price queries via Africa's Talking</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 animate-slide-up">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">SMS Simulator</h3>
          </div>
          <div className="mb-4 h-80 overflow-y-auto space-y-3 rounded-md bg-secondary/50 p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
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
              className="flex-1 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-mono-price text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
            <button onClick={handleSend} className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 animate-slide-up">
          <h3 className="mb-4 font-semibold text-foreground">SMS Commands Reference</h3>
          <div className="space-y-3">
            <div className="rounded-md border border-border bg-secondary/50 p-3">
              <p className="font-mono-price text-sm text-primary">PRICE [CROP] [MARKET]</p>
              <p className="mt-1 text-xs text-muted-foreground">Get price for a specific crop in a market</p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Available Crops</h4>
              <div className="flex flex-wrap gap-2">
                {crops.map(c => (
                  <span key={c.id} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-foreground">{c.emoji} {c.name}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Available Markets</h4>
              <div className="flex flex-wrap gap-2">
                {markets.map(m => (
                  <span key={m.id} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-foreground">{m.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSDemo;
