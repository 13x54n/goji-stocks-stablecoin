"use client";

import { useState } from "react";
import { ExternalLink, ArrowUpDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const newOnPlatform = [
  { name: "Orchid", symbol: "O", added: "2 days ago", icon: "O" },
  { name: "PayPal", symbol: "PYPL", added: "MOVE", icon: "P" },
  { name: "Movement", symbol: "MOVE", added: "2 weeks ago", icon: "M" },
  { name: "Caldera", symbol: "CAL", added: "2 weeks ago", icon: "C" },
];

export function TradingPanel() {
  const [buyAmount, setBuyAmount] = useState("0.54");
  const [payAmount, setPayAmount] = useState("63,821.37");

  return (
    <div className="w-80 h-screen bg-black border-l border-border p-6 overflow-y-auto">
      {/* Buy Crypto Link */}
      <div className="mb-6">
        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
          <ExternalLink className="w-4 h-4 mr-2" />
          Buy Crypto
        </Button>
      </div>

      {/* Buy/Sell/Convert Tabs */}
      <Tabs defaultValue="buy" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="buy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Sell
          </TabsTrigger>
          <TabsTrigger value="convert" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Convert
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Buy Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">You're buying</span>
                    <span className="text-sm text-muted-foreground">BTC Balance = $0.00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="text-right text-lg font-semibold"
                      />
                    </div>
                    <Button variant="outline" className="bg-input border-input">
                      BTC <span className="ml-1">▼</span>
                    </Button>
                  </div>
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center">
                  <Button variant="ghost" size="sm" className="p-2">
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* Pay With Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pay with</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="text-right text-lg font-semibold"
                      />
                    </div>
                    <Button variant="outline" className="bg-input border-input">
                      USDT <span className="ml-1">▼</span>
                    </Button>
                  </div>
                </div>

                {/* Buy Now Button */}
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-semibold">
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New on Platform */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">New on Goji</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {newOnPlatform.map((item) => (
              <div key={item.name} className="flex items-center justify-between hover:bg-accent/50 p-2 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{item.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.added}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent transactions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You don't own any crypto. Ready to make a purchase?
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Trade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
