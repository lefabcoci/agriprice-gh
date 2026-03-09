import { useState, useEffect } from "react";
import { Download, Smartphone, Wifi, WifiOff, Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const features = [
    { icon: <WifiOff className="h-5 w-5" />, title: "Works Offline", desc: "Browse cached prices without internet" },
    { icon: <Bell className="h-5 w-5" />, title: "Price Alerts", desc: "Get notified when prices change" },
    { icon: <Smartphone className="h-5 w-5" />, title: "Home Screen", desc: "Launch instantly like a native app" },
    { icon: <Download className="h-5 w-5" />, title: "No App Store", desc: "Install directly from your browser" },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img src="/pwa-192.png" alt="AgriPrice GH" className="w-24 h-24 rounded-2xl shadow-lg" />
        </div>

        {/* Status badge */}
        <div className="flex justify-center gap-2 mb-4">
          <Badge variant={isOnline ? "default" : "destructive"} className="gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
          {isInstalled && (
            <Badge className="gap-1 bg-primary text-primary-foreground">
              <CheckCircle className="h-3 w-3" /> Installed
            </Badge>
          )}
        </div>

        <h1 className="font-display text-4xl font-bold text-foreground mb-3">
          Install AgriPrice GH
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Add to your home screen for instant access to crop prices — even without internet.
        </p>

        {/* Install button */}
        {!isInstalled && (
          <div className="mb-10">
            {deferredPrompt ? (
              <Button onClick={handleInstall} size="lg" className="gap-2 text-base px-8">
                <Download className="h-5 w-5" />
                Install App
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-medium">To install on your device:</p>
                <div className="bg-muted rounded-xl p-4 text-sm text-left space-y-2">
                  <p className="font-semibold text-foreground">📱 iPhone / Safari</p>
                  <p className="text-muted-foreground">Tap the <strong>Share</strong> button → <strong>Add to Home Screen</strong></p>
                  <div className="border-t border-border my-2" />
                  <p className="font-semibold text-foreground">🤖 Android / Chrome</p>
                  <p className="text-muted-foreground">Tap the <strong>Menu (⋮)</strong> → <strong>Add to Home screen</strong></p>
                </div>
              </div>
            )}
          </div>
        )}

        {isInstalled && (
          <div className="mb-10 bg-primary/10 border border-primary/20 rounded-xl p-6">
            <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="font-semibold text-foreground text-lg">App Installed!</p>
            <p className="text-muted-foreground text-sm mt-1">Launch AgriPrice GH from your home screen anytime.</p>
          </div>
        )}

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="text-left">
              <CardContent className="p-4 flex gap-3 items-start">
                <div className="text-primary mt-0.5">{f.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstallPage;
