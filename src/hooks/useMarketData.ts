import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Crop = Tables<"crops">;
export type Market = Tables<"markets">;
export type Price = Tables<"prices">;

export const useCrops = () =>
  useQuery({
    queryKey: ["crops"],
    queryFn: async () => {
      const { data, error } = await supabase.from("crops").select("*").order("name");
      if (error) throw error;
      return data as Crop[];
    },
  });

export const useMarkets = () =>
  useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("markets").select("*").order("name");
      if (error) throw error;
      return data as Market[];
    },
  });

export const usePrices = () =>
  useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prices").select("*");
      if (error) throw error;
      return data as Price[];
    },
  });

// Helper functions that work with fetched data
export function getBestMarketForCrop(
  cropId: string,
  prices: Price[],
  markets: Market[]
) {
  const cropPrices = prices.filter((p) => p.crop_id === cropId);
  if (!cropPrices.length) return null;
  const best = cropPrices.reduce((a, b) => (a.price > b.price ? a : b));
  const market = markets.find((m) => m.id === best.market_id);
  return { market, price: best.price };
}

export function getWorstMarketForCrop(
  cropId: string,
  prices: Price[],
  markets: Market[]
) {
  const cropPrices = prices.filter((p) => p.crop_id === cropId);
  if (!cropPrices.length) return null;
  const worst = cropPrices.reduce((a, b) => (a.price < b.price ? a : b));
  const market = markets.find((m) => m.id === worst.market_id);
  return { market, price: worst.price };
}

export function getPriceForCropMarket(
  cropId: string,
  marketId: string,
  prices: Price[]
): number | null {
  return prices.find((p) => p.crop_id === cropId && p.market_id === marketId)?.price ?? null;
}

export function generateTrendData(cropId: string, marketId: string, prices: Price[]) {
  const basePrice =
    prices.find((p) => p.crop_id === cropId && p.market_id === marketId)?.price || 300;
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  return weeks.map((week, i) => ({
    week,
    price: Math.round(basePrice * (0.9 + Math.random() * 0.2) + i * 3),
  }));
}
