import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    balance: "2.5432",
    value: "$120,512.26",
    change: "+5.2%",
    isPositive: true,
    color: "text-orange-500"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    balance: "15.2341",
    value: "$55,456.78",
    change: "+2.1%",
    isPositive: true,
    color: "text-blue-500"
  },
  {
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    balance: "125.67",
    value: "$23,045.12",
    change: "-1.8%",
    isPositive: false,
    color: "text-purple-500"
  },
  {
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    balance: "5000.00",
    value: "$5,000.00",
    change: "0.0%",
    isPositive: true,
    color: "text-green-500"
  },
  {
    name: "BNB",
    symbol: "BNB",
    icon: "B",
    balance: "8.45",
    value: "$6,321.50",
    change: "+3.7%",
    isPositive: true,
    color: "text-yellow-500"
  },
  {
    name: "Cardano",
    symbol: "ADA",
    icon: "A",
    balance: "2500.00",
    value: "$1,250.00",
    change: "-0.5%",
    isPositive: false,
    color: "text-blue-600"
  }
];

export function AssetsPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Assets</h1>
        <p className="text-muted-foreground">Manage your cryptocurrency portfolio</p>
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

      {/* Assets List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className={`text-xl font-bold ${asset.color}`}>{asset.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground">{asset.balance} {asset.symbol}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{asset.value}</p>
                    <p className={`text-sm flex items-center gap-1 ${
                      asset.isPositive ? "text-green-400" : "text-red-400"
                    }`}>
                      {asset.isPositive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {asset.change}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Send
                    </Button>
                    <Button size="sm" variant="outline">
                      Receive
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Trade
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
