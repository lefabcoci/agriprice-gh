import { Link } from "react-router-dom";
import { crops, markets } from "@/data/mockData";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-16">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-serif font-bold text-primary">AgriPrice GH</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Empowering Ghanaian farmers with real-time market price data. Know your crop's worth before you sell.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-bold text-foreground mb-3">Crops</h4>
          <ul className="space-y-2">
            {crops.slice(0, 6).map(c => (
              <li key={c.id}>
                <Link to="/prices" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {c.emoji} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-foreground mb-3">Markets</h4>
          <ul className="space-y-2">
            {markets.map(m => (
              <li key={m.id}>
                <Link to="/prices" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  📍 {m.name} — {m.region}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-foreground mb-3">Platform</h4>
          <ul className="space-y-2">
            <li><Link to="/sms" className="text-sm text-muted-foreground hover:text-primary transition-colors">SMS Queries</Link></li>
            <li><Link to="/ussd" className="text-sm text-muted-foreground hover:text-primary transition-colors">USSD *384#</Link></li>
            <li><Link to="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors">Price Compare</Link></li>
            <li><Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Panel</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 AgriPrice GH. Built for Ghanaian farmers. 🇬🇭</p>
      </div>
    </div>
  </footer>
);

export default Footer;
