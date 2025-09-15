import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

const transactions = [
  {
    id: "1",
    type: "buy",
    asset: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
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
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
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
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
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
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
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
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
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
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
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

      {/* Transactions Table */}
      <div className="bg-black rounded-lg overflow-hidden border border-border">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-medium text-muted-foreground">Asset</th>
                <th className="p-4 font-medium text-muted-foreground text-center">Amount</th>
                <th className="p-4 font-medium text-muted-foreground text-center">Status</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
                        <Image src={tx.image} alt={tx.asset} width={40} height={40} className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{tx.asset}</div>
                        <div className="text-sm text-muted-foreground">{tx.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="flex items-center justify-end gap-2 flex-col">
                      <span>
                        {tx.type === 'buy' ? '+' : '-'}{tx.amount} {tx.symbol}
                      </span>
                      <span>
                        {tx.value}
                      </span>
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      {/* {getStatusIcon(tx.status)} */}
                      {getStatusBadge(tx.status)}
                    </div>
                  </td>
                  <td className="p-4 text-right">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list fallback */}
        <div className="md:hidden p-4 space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center overflow-hidden">
                    <Image src={tx.image} alt={tx.asset} width={40} height={40} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{tx.asset}</div>
                    <div className="text-sm text-muted-foreground">{tx.symbol}</div>
                  </div>
                </div>
                <div className="capitalize">{tx.type}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Amount</div>
                <div className="font-medium text-foreground">{tx.type === 'buy' ? '+' : '-'}{tx.amount} {tx.symbol}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Value</div>
                <div className="text-foreground">{tx.value}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  {getStatusBadge(tx.status)}
                </div>
                <div className="text-sm text-muted-foreground">{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
