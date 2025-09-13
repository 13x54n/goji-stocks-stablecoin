"use client";

import { useState, useEffect } from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  marketCap: string;
  isPositive: boolean;
  image: string;
}

// Mock data removed - now fetching from backend API

function Sparkline({ isPositive }: { isPositive: boolean }) {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights only on client side
    setHeights(Array.from({ length: 8 }, () => Math.random() * 20 + 10));
  }, []);

  if (heights.length === 0) {
    // Show placeholder during SSR and initial client render
    return (
      <div className="w-16 h-8 flex items-end gap-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-sm ${isPositive ? "bg-green-400" : "bg-red-400"
              }`}
            style={{
              height: "15px", // Fixed height for SSR
              opacity: 0.7 + (i / 8) * 0.3
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-16 h-8 flex items-end gap-0.5">
      {heights.map((height, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm ${isPositive ? "bg-green-400" : "bg-red-400"
            }`}
          style={{
            height: `${height}px`,
            opacity: 0.7 + (i / 8) * 0.3
          }}
        />
      ))}
    </div>
  );
}

export function CryptoList() {
  const [showStocks, setShowStocks] = useState(false);
  const [cryptoDataFromAPI, setCryptoDataFromAPI] = useState<CryptoData[]>([]);
  const [stocksDataFromAPI, setStocksDataFromAPI] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch crypto data
        const cryptoResponse = await fetch('/api/crypto');
        if (!cryptoResponse.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        const cryptoResult = await cryptoResponse.json();
        
        // Transform API data to match component format
        const transformedCrypto = cryptoResult.data.map((item: any) => ({
          name: item.name,
          symbol: item.symbol,
          price: `$${item.price.toLocaleString()}`,
          change: item.change.toFixed(2),
          changePercent: `${item.changePercent.toFixed(2)}%`,
          marketCap: formatMarketCap(item.marketCap),
          isPositive: item.isPositive,
          image: item.image
        }));
        
        setCryptoDataFromAPI(transformedCrypto);

        // Fetch stocks data
        const stocksResponse = await fetch('/api/stocks');
        if (!stocksResponse.ok) {
          throw new Error('Failed to fetch stocks data');
        }
        const stocksResult = await stocksResponse.json();
        
        // Transform API data to match component format
        const transformedStocks = stocksResult.data.map((item: any) => ({
          name: item.name,
          symbol: item.symbol,
          price: `$${item.price.toLocaleString()}`,
          change: item.change.toFixed(2),
          changePercent: `${item.changePercent.toFixed(2)}%`,
          marketCap: formatMarketCap(item.marketCap),
          isPositive: item.isPositive,
          image: item.image
        }));
        
        setStocksDataFromAPI(transformedStocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        // No fallback data - show empty arrays
        setCryptoDataFromAPI([]);
        setStocksDataFromAPI([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatMarketCap = (value: number): string => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const currentData = showStocks ? stocksDataFromAPI : cryptoDataFromAPI;

  // Show empty state if no data
  if (currentData.length === 0 && !loading && !error) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No {showStocks ? 'stocks' : 'crypto'} data available</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading {showStocks ? 'stocks' : 'crypto'} data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-2">Error: {error}</p>
            <p className="text-muted-foreground text-sm">Unable to load {showStocks ? 'stocks' : 'crypto'} data</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* switch between crypto and stocks */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Label className={!showStocks ? "text-foreground" : "text-muted-foreground"}>Crypto</Label>
          <Switch
            checked={showStocks}
            onCheckedChange={setShowStocks}
          />
          <Label className={showStocks ? "text-foreground" : "text-muted-foreground"}>Tokenized Stocks</Label>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Live from API</span>
        </div>
      </div>

      {/* Crypto Table */}
      <div className="bg-black rounded-lg overflow-hidden border border-border">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr className="text-left">
              <th className="p-4 font-medium text-muted-foreground">Name</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Price</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Change</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Market Cap</th>
              <th className="p-4 font-medium text-muted-foreground text-center">Chart</th>
              <th className="p-4 font-medium text-muted-foreground text-center">Action</th>
              <th className="p-4 font-medium text-muted-foreground text-center">Favorite</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((crypto) => (
              <tr key={crypto.symbol} className="border-b border-border hover:bg-accent/50 transition-colors">
                {/* Name */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-transparent flex items-center justify-center overflow-hidden`}>
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width={32}
                        height={32}
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="p-4 text-right">
                  <div className="font-semibold text-foreground">{crypto.price}</div>
                </td>

                {/* Change */}
                <td className="p-4 text-right">
                  <div className={`text-sm flex items-center justify-end gap-1 ${crypto.isPositive ? "text-green-400" : "text-red-400"
                    }`}>
                    {crypto.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {crypto.changePercent}
                  </div>
                </td>

                {/* Market Cap */}
                <td className="p-4 text-right">
                  <div className="text-sm text-muted-foreground">
                    {crypto.marketCap}
                  </div>
                </td>

                {/* Sparkline */}
                <td className="p-4 text-center">
                  <Sparkline isPositive={crypto.isPositive} />
                </td>

                {/* Buy Button */}
                <td className="p-4 text-center">
                  <Button size="sm" className="bg-transparent hover:bg-transparent text-foreground">
                    Buy
                  </Button>
                </td>

                {/* Favorite */}
                <td className="p-4 text-center">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
