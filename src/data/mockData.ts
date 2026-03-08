export interface Crop {
  id: string;
  name: string;
  category: string;
  emoji: string;
  imageUrl: string;
  unit: string;
  description: string;
}

export interface Market {
  id: string;
  name: string;
  region: string;
  location: string;
  imageUrl: string;
}

export interface Price {
  id: string;
  cropId: string;
  marketId: string;
  price: number;
  dateRecorded: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

export interface PriceHistory {
  week: string;
  price: number;
}

export const crops: Crop[] = [
  { id: "c1", name: "Maize", category: "Grain", emoji: "🌽", imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop", unit: "bag (100kg)", description: "Premium quality maize grain, locally sourced from farms across Ghana" },
  { id: "c2", name: "Tomato", category: "Vegetable", emoji: "🍅", imageUrl: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop", unit: "crate", description: "Fresh ripe tomatoes, hand-picked from local greenhouses" },
  { id: "c3", name: "Rice", category: "Grain", emoji: "🌾", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", unit: "bag (50kg)", description: "Local rice varieties from irrigated paddies in the Northern region" },
  { id: "c4", name: "Onion", category: "Vegetable", emoji: "🧅", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop", unit: "bag (50kg)", description: "Red and white onions from the Upper East and Bono regions" },
  { id: "c5", name: "Yam", category: "Tuber", emoji: "🥔", imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=300&fit=crop", unit: "tuber (large)", description: "Premium puna yam from the yam belt of Ghana" },
  { id: "c6", name: "Cassava", category: "Tuber", emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=400&h=300&fit=crop", unit: "bag (100kg)", description: "Freshly harvested cassava roots, ideal for gari and fufu" },
  { id: "c7", name: "Plantain", category: "Fruit", emoji: "🍌", imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop", unit: "bunch", description: "Ripe and unripe plantain bunches from the Ashanti and Eastern regions" },
  { id: "c8", name: "Pepper", category: "Vegetable", emoji: "🌶️", imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop", unit: "bag (50kg)", description: "Hot chili peppers and shito pepper from Ghanaian farms" },
];

export const markets: Market[] = [
  { id: "m1", name: "Accra", region: "Greater Accra", location: "Makola Market", imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=400&fit=crop" },
  { id: "m2", name: "Kumasi", region: "Ashanti", location: "Kejetia Market", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop" },
  { id: "m3", name: "Tamale", region: "Northern", location: "Tamale Central", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop" },
  { id: "m4", name: "Techiman", region: "Bono East", location: "Techiman Market", imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop" },
];

export const prices: Price[] = [
  // Maize
  { id: "p1", cropId: "c1", marketId: "m1", price: 400, dateRecorded: "2026-03-08", trend: "up", changePercent: 5.2 },
  { id: "p2", cropId: "c1", marketId: "m2", price: 380, dateRecorded: "2026-03-08", trend: "up", changePercent: 3.1 },
  { id: "p3", cropId: "c1", marketId: "m3", price: 350, dateRecorded: "2026-03-08", trend: "down", changePercent: 2.0 },
  { id: "p4", cropId: "c1", marketId: "m4", price: 420, dateRecorded: "2026-03-08", trend: "up", changePercent: 7.5 },
  // Tomato
  { id: "p5", cropId: "c2", marketId: "m1", price: 250, dateRecorded: "2026-03-08", trend: "down", changePercent: 4.0 },
  { id: "p6", cropId: "c2", marketId: "m2", price: 230, dateRecorded: "2026-03-08", trend: "stable", changePercent: 0.5 },
  { id: "p7", cropId: "c2", marketId: "m3", price: 200, dateRecorded: "2026-03-08", trend: "down", changePercent: 6.2 },
  { id: "p8", cropId: "c2", marketId: "m4", price: 270, dateRecorded: "2026-03-08", trend: "up", changePercent: 3.8 },
  // Rice
  { id: "p9", cropId: "c3", marketId: "m1", price: 520, dateRecorded: "2026-03-08", trend: "up", changePercent: 2.3 },
  { id: "p10", cropId: "c3", marketId: "m2", price: 500, dateRecorded: "2026-03-08", trend: "stable", changePercent: 0.8 },
  { id: "p11", cropId: "c3", marketId: "m3", price: 480, dateRecorded: "2026-03-08", trend: "down", changePercent: 1.5 },
  { id: "p12", cropId: "c3", marketId: "m4", price: 510, dateRecorded: "2026-03-08", trend: "up", changePercent: 1.9 },
  // Onion
  { id: "p13", cropId: "c4", marketId: "m1", price: 300, dateRecorded: "2026-03-08", trend: "up", changePercent: 8.2 },
  { id: "p14", cropId: "c4", marketId: "m2", price: 280, dateRecorded: "2026-03-08", trend: "up", changePercent: 5.5 },
  { id: "p15", cropId: "c4", marketId: "m3", price: 260, dateRecorded: "2026-03-08", trend: "stable", changePercent: 0.3 },
  { id: "p16", cropId: "c4", marketId: "m4", price: 320, dateRecorded: "2026-03-08", trend: "up", changePercent: 10.1 },
  // Yam
  { id: "p17", cropId: "c5", marketId: "m1", price: 600, dateRecorded: "2026-03-08", trend: "down", changePercent: 3.0 },
  { id: "p18", cropId: "c5", marketId: "m2", price: 580, dateRecorded: "2026-03-08", trend: "down", changePercent: 2.5 },
  { id: "p19", cropId: "c5", marketId: "m3", price: 550, dateRecorded: "2026-03-08", trend: "down", changePercent: 4.8 },
  { id: "p20", cropId: "c5", marketId: "m4", price: 620, dateRecorded: "2026-03-08", trend: "stable", changePercent: 0.6 },
  // Cassava
  { id: "p21", cropId: "c6", marketId: "m1", price: 180, dateRecorded: "2026-03-08", trend: "up", changePercent: 6.0 },
  { id: "p22", cropId: "c6", marketId: "m2", price: 160, dateRecorded: "2026-03-08", trend: "stable", changePercent: 1.2 },
  { id: "p23", cropId: "c6", marketId: "m3", price: 150, dateRecorded: "2026-03-08", trend: "down", changePercent: 3.4 },
  { id: "p24", cropId: "c6", marketId: "m4", price: 190, dateRecorded: "2026-03-08", trend: "up", changePercent: 8.7 },
  // Plantain
  { id: "p25", cropId: "c7", marketId: "m1", price: 350, dateRecorded: "2026-03-08", trend: "up", changePercent: 4.2 },
  { id: "p26", cropId: "c7", marketId: "m2", price: 320, dateRecorded: "2026-03-08", trend: "stable", changePercent: 0.9 },
  { id: "p27", cropId: "c7", marketId: "m3", price: 300, dateRecorded: "2026-03-08", trend: "down", changePercent: 2.1 },
  { id: "p28", cropId: "c7", marketId: "m4", price: 370, dateRecorded: "2026-03-08", trend: "up", changePercent: 6.3 },
  // Pepper
  { id: "p29", cropId: "c8", marketId: "m1", price: 450, dateRecorded: "2026-03-08", trend: "up", changePercent: 9.1 },
  { id: "p30", cropId: "c8", marketId: "m2", price: 420, dateRecorded: "2026-03-08", trend: "up", changePercent: 5.8 },
  { id: "p31", cropId: "c8", marketId: "m3", price: 380, dateRecorded: "2026-03-08", trend: "stable", changePercent: 1.0 },
  { id: "p32", cropId: "c8", marketId: "m4", price: 470, dateRecorded: "2026-03-08", trend: "up", changePercent: 11.2 },
];

export function generateTrendData(cropId: string, marketId: string): PriceHistory[] {
  const basePrice = prices.find(p => p.cropId === cropId && p.marketId === marketId)?.price || 300;
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  return weeks.map((week, i) => ({
    week,
    price: Math.round(basePrice * (0.9 + Math.random() * 0.2) + (i * 3)),
  }));
}

export function getPriceForCropMarket(cropId: string, marketId: string): number | null {
  return prices.find(p => p.cropId === cropId && p.marketId === marketId)?.price ?? null;
}

export function getPriceDataForCropMarket(cropId: string, marketId: string): Price | null {
  return prices.find(p => p.cropId === cropId && p.marketId === marketId) ?? null;
}

export function getBestMarketForCrop(cropId: string) {
  const cropPrices = prices.filter(p => p.cropId === cropId);
  if (!cropPrices.length) return null;
  const best = cropPrices.reduce((a, b) => (a.price > b.price ? a : b));
  const market = markets.find(m => m.id === best.marketId);
  return { market, price: best.price };
}

export function getWorstMarketForCrop(cropId: string) {
  const cropPrices = prices.filter(p => p.cropId === cropId);
  if (!cropPrices.length) return null;
  const worst = cropPrices.reduce((a, b) => (a.price < b.price ? a : b));
  const market = markets.find(m => m.id === worst.marketId);
  return { market, price: worst.price };
}

export function parseSMSCommand(text: string): string {
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
  const price = getPriceForCropMarket(crop.id, market.id);
  const best = getBestMarketForCrop(crop.id);
  if (!price) return "Price data not available.";
  return `${crop.name} in ${market.name}: GHS ${price}/${crop.unit}. Best market today: ${best?.market?.name} GHS ${best?.price}. Powered by AgriPrice GH`;
}
