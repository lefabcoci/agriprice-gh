export interface Crop {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

export interface Market {
  id: string;
  name: string;
  region: string;
  location: string;
}

export interface Price {
  id: string;
  cropId: string;
  marketId: string;
  price: number;
  dateRecorded: string;
}

export interface PriceHistory {
  week: string;
  price: number;
}

export const crops: Crop[] = [
  { id: "c1", name: "Maize", category: "Grain", emoji: "🌽" },
  { id: "c2", name: "Tomato", category: "Vegetable", emoji: "🍅" },
  { id: "c3", name: "Rice", category: "Grain", emoji: "🌾" },
  { id: "c4", name: "Onion", category: "Vegetable", emoji: "🧅" },
  { id: "c5", name: "Yam", category: "Tuber", emoji: "🥔" },
  { id: "c6", name: "Cassava", category: "Tuber", emoji: "🌿" },
];

export const markets: Market[] = [
  { id: "m1", name: "Accra", region: "Greater Accra", location: "Makola Market" },
  { id: "m2", name: "Kumasi", region: "Ashanti", location: "Kejetia Market" },
  { id: "m3", name: "Tamale", region: "Northern", location: "Tamale Central" },
  { id: "m4", name: "Techiman", region: "Bono East", location: "Techiman Market" },
];

export const prices: Price[] = [
  // Maize
  { id: "p1", cropId: "c1", marketId: "m1", price: 400, dateRecorded: "2026-03-08" },
  { id: "p2", cropId: "c1", marketId: "m2", price: 380, dateRecorded: "2026-03-08" },
  { id: "p3", cropId: "c1", marketId: "m3", price: 350, dateRecorded: "2026-03-08" },
  { id: "p4", cropId: "c1", marketId: "m4", price: 420, dateRecorded: "2026-03-08" },
  // Tomato
  { id: "p5", cropId: "c2", marketId: "m1", price: 250, dateRecorded: "2026-03-08" },
  { id: "p6", cropId: "c2", marketId: "m2", price: 230, dateRecorded: "2026-03-08" },
  { id: "p7", cropId: "c2", marketId: "m3", price: 200, dateRecorded: "2026-03-08" },
  { id: "p8", cropId: "c2", marketId: "m4", price: 270, dateRecorded: "2026-03-08" },
  // Rice
  { id: "p9", cropId: "c3", marketId: "m1", price: 520, dateRecorded: "2026-03-08" },
  { id: "p10", cropId: "c3", marketId: "m2", price: 500, dateRecorded: "2026-03-08" },
  { id: "p11", cropId: "c3", marketId: "m3", price: 480, dateRecorded: "2026-03-08" },
  { id: "p12", cropId: "c3", marketId: "m4", price: 510, dateRecorded: "2026-03-08" },
  // Onion
  { id: "p13", cropId: "c4", marketId: "m1", price: 300, dateRecorded: "2026-03-08" },
  { id: "p14", cropId: "c4", marketId: "m2", price: 280, dateRecorded: "2026-03-08" },
  { id: "p15", cropId: "c4", marketId: "m3", price: 260, dateRecorded: "2026-03-08" },
  { id: "p16", cropId: "c4", marketId: "m4", price: 320, dateRecorded: "2026-03-08" },
  // Yam
  { id: "p17", cropId: "c5", marketId: "m1", price: 600, dateRecorded: "2026-03-08" },
  { id: "p18", cropId: "c5", marketId: "m2", price: 580, dateRecorded: "2026-03-08" },
  { id: "p19", cropId: "c5", marketId: "m3", price: 550, dateRecorded: "2026-03-08" },
  { id: "p20", cropId: "c5", marketId: "m4", price: 620, dateRecorded: "2026-03-08" },
  // Cassava
  { id: "p21", cropId: "c6", marketId: "m1", price: 180, dateRecorded: "2026-03-08" },
  { id: "p22", cropId: "c6", marketId: "m2", price: 160, dateRecorded: "2026-03-08" },
  { id: "p23", cropId: "c6", marketId: "m3", price: 150, dateRecorded: "2026-03-08" },
  { id: "p24", cropId: "c6", marketId: "m4", price: 190, dateRecorded: "2026-03-08" },
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
  return `${crop.name} in ${market.name}: GHS ${price}/bag. Best market: ${best?.market?.name} GHS ${best?.price}. Updated: today.`;
}
