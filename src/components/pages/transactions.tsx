import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "buy",
    asset: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    amount: "0.05",
    value: "$3,200.00",
    status: "completed",
    time: "2 hours ago",
    hash: "0x1234...5678"
  },
  {
    id: "2",
    type: "sell",
    asset: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    amount: "2.1",
    value: "$7,650.00",
    status: "completed",
    time: "5 hours ago",
    hash: "0x9876...5432"
  },
  {
    id: "3",
    type: "buy",
    asset: "Solana",
    symbol: "SOL",
    icon: "◎",
    amount: "25",
    value: "$4,587.50",
    status: "pending",
    time: "1 day ago",
    hash: "0xabcd...efgh"
  },
  {
    id: "4",
    type: "sell",
    asset: "BNB",
    symbol: "BNB",
    icon: "B",
    amount: "1.5",
    value: "$1,121.25",
    status: "failed",
    time: "2 days ago",
    hash: "0xijkl...mnop"
  },
  {
    id: "5",
    type: "buy",
    asset: "Cardano",
    symbol: "ADA",
    icon: "A",
    amount: "1000",
    value: "$500.00",
    status: "completed",
    time: "3 days ago",
    hash: "0xqrst...uvwx"
  },
  {
    id: "6",
    type: "sell",
    asset: "Tether",
    symbol: "USDT",
    icon: "₮",
    amount: "500",
    value: "$500.00",
    status: "completed",
    time: "1 week ago",
    hash: "0xyzaa...bbcc"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-400" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-400" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    case "failed":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
    default:
      return null;
  }
};

export function TransactionsPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Transactions</h1>
        <p className="text-muted-foreground">View your trading history and transaction details</p>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-green-400">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,678</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-green-400">Completed trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">{tx.icon}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {tx.type === "buy" ? (
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-400" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground capitalize">{tx.type} {tx.asset}</p>
                      <p className="text-sm text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {tx.type === "buy" ? "+" : "-"}{tx.amount} {tx.symbol}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.value}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(tx.status)}
                    {getStatusBadge(tx.status)}
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">Load More Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
