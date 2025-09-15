import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Asset = {
  id: string;
  type: "crypto" | "stock";
  name: string;
  symbol: string;
  image: string;
  price: number;
  balance: number;
  value?: number;
  changePercent: number;
  isPositive: boolean;
};

export function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/assets');
        if (!res.ok) throw new Error('Failed to fetch assets');
        const json = await res.json();
        setAssets(Array.isArray(json?.data) ? json.data : []);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch assets');
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const formatUSD = (n: number): string => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Assets</h1>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$211,585.66</div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">+$16,945.23</div>
            <p className="text-xs text-muted-foreground">+8.7% overall</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.length}</div>
            <p className="text-xs text-muted-foreground">Different cryptocurrencies</p>
          </CardContent>
        </Card>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="border border-border rounded-lg p-6 text-muted-foreground">Loading assets...</div>
      )}
      {error && !loading && (
        <div className="border border-border rounded-lg p-6 text-red-400">{error}</div>
      )}

      {/* Assets Table */}
      <div className="bg-black rounded-lg overflow-hidden border border-border">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-medium text-muted-foreground">Name</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Balance</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Price</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Value</th>
                <th className="p-4 font-medium text-muted-foreground text-right">24h</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                const valueNum = typeof asset.value === 'number' ? asset.value : asset.price * asset.balance;
                const price = asset.price;
                return (
                  <tr key={asset.symbol} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${asset.type === 'stock' ? 'bg-white p-1 rounded-full' : 'bg-black rounded-full'} flex items-center justify-center overflow-hidden`}>
                          <Image src={asset.image} alt={asset.name} width={40} height={40} className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-foreground font-medium">{asset.balance.toLocaleString()}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-foreground">{formatUSD(price)}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-foreground font-semibold">{formatUSD(valueNum)}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className={`text-sm inline-flex items-center gap-1 ${asset.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {`${asset.changePercent.toFixed(2)}%`}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards fallback */}
        <div className="md:hidden p-4 space-y-4">
          {assets.map((asset) => {
            const valueNum = typeof asset.value === 'number' ? asset.value : asset.price * asset.balance;
            const price = asset.price;
            return (
              <div key={asset.symbol} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${asset.type === 'stock' ? 'bg-white p-1 rounded-full' : 'bg-black rounded-full'} flex items-center justify-center overflow-hidden`}>
                      <Image src={asset.image} alt={asset.name} width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                  <div className={`text-sm inline-flex items-center gap-1 ${asset.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {`${asset.changePercent.toFixed(2)}%`}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Balance</div>
                  <div className="font-medium text-foreground">{asset.balance.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-foreground">{formatUSD(price)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Value</div>
                  <div className="font-semibold text-foreground">{formatUSD(valueNum)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
