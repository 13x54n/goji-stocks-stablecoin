import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Lock, Coins, Award, Zap } from "lucide-react";

const earningOptions = [
  {
    id: 1,
    title: "Bitcoin Staking",
    description: "Earn rewards by staking your Bitcoin",
    apy: "4.2%",
    minAmount: "0.1 BTC",
    icon: "₿",
    color: "text-orange-500",
    status: "active",
    balance: "0.25 BTC",
    earned: "+0.0012 BTC"
  },
  {
    id: 2,
    title: "Ethereum Staking",
    description: "Stake ETH and earn rewards",
    apy: "5.8%",
    minAmount: "32 ETH",
    icon: "Ξ",
    color: "text-blue-500",
    status: "available",
    balance: "0 ETH",
    earned: "0 ETH"
  },
  {
    id: 3,
    title: "Solana Staking",
    description: "High yield staking on Solana network",
    apy: "7.5%",
    minAmount: "10 SOL",
    icon: "◎",
    color: "text-purple-500",
    status: "active",
    balance: "50 SOL",
    earned: "+0.25 SOL"
  },
  {
    id: 4,
    title: "Liquidity Mining",
    description: "Provide liquidity and earn fees",
    apy: "12.3%",
    minAmount: "$100",
    icon: "💧",
    color: "text-green-500",
    status: "available",
    balance: "$0",
    earned: "$0"
  },
  {
    id: 5,
    title: "Yield Farming",
    description: "Farm tokens by providing liquidity",
    apy: "18.7%",
    minAmount: "$500",
    icon: "🌾",
    color: "text-yellow-500",
    status: "available",
    balance: "$0",
    earned: "$0"
  },
  {
    id: 6,
    title: "Lending Pool",
    description: "Lend your crypto and earn interest",
    apy: "8.9%",
    minAmount: "$50",
    icon: "🏦",
    color: "text-blue-600",
    status: "active",
    balance: "$2,500 USDT",
    earned: "+$18.75"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
    case "available":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Available</Badge>;
    default:
      return null;
  }
};

export function EarnPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Earn</h1>
        <p className="text-muted-foreground">Grow your crypto portfolio with earning opportunities</p>
      </div>

      {/* Earning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">8.7%</div>
            <p className="text-xs text-muted-foreground">Average across all positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Active Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-green-400">+1 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Total Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,456.78</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234.56</div>
            <p className="text-xs text-green-400">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Earning Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {earningOptions.map((option) => (
          <Card key={option.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className={`text-xl font-bold ${option.color}`}>{option.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                {getStatusBadge(option.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">APY</span>
                  <span className="text-xl font-bold text-green-400">{option.apy}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Min Amount</span>
                  <span className="text-sm font-medium">{option.minAmount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Balance</span>
                  <span className="text-sm font-medium">{option.balance}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Earned</span>
                  <span className="text-sm font-medium text-green-400">{option.earned}</span>
                </div>

                <div className="pt-2">
                  {option.status === "active" ? (
                    <Button variant="outline" className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Manage Position
                    </Button>
                  ) : (
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Start Earning
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
