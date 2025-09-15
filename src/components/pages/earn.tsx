import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Coins, Award, Zap, Link as LinkIcon, Copy } from "lucide-react";
import { useMemo, useState } from "react";

type Referral = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  trades: number;
  volumeUsd: number;
  rewardUsd: number;
  status: "active" | "pending";
};

const referrals: Referral[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", joinedAt: "2025-08-10", trades: 14, volumeUsd: 24567.23, rewardUsd: 36.84, status: "active" },
  { id: "u2", name: "Bob Martinez", email: "bob@example.com", joinedAt: "2025-08-22", trades: 5, volumeUsd: 5230.54, rewardUsd: 7.85, status: "active" },
  { id: "u3", name: "Chloe Kim", email: "chloe@example.com", joinedAt: "2025-09-02", trades: 2, volumeUsd: 980.13, rewardUsd: 1.47, status: "pending" },
  { id: "u4", name: "David Liu", email: "david@example.com", joinedAt: "2025-09-05", trades: 9, volumeUsd: 11234.88, rewardUsd: 16.85, status: "active" },
  { id: "u5", name: "Ella Singh", email: "ella@example.com", joinedAt: "2025-09-08", trades: 3, volumeUsd: 1850.0, rewardUsd: 2.78, status: "pending" },
];

const getReferralStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    default:
      return null;
  }
};

export function EarnPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "GOJI-7F3K2Q";
  const referralLink = `https://goji.example.com/signup?ref=${referralCode}`;

  const totals = useMemo(() => {
    const totalRefs = referrals.length;
    const totalVolume = referrals.reduce((s, r) => s + r.volumeUsd, 0);
    const totalRewards = referrals.reduce((s, r) => s + r.rewardUsd, 0);
    return { totalRefs, totalVolume, totalRewards };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Refer & Earn</h1>
        <p className="text-muted-foreground">Invite friends, track their traded volume, and earn rewards</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalRefs}</div>
            <p className="text-xs text-muted-foreground">Invited users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Referred Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time trading volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4" />
              Rewards Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">${totals.totalRewards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From referred trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-mono">{referralCode}</div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 truncate text-sm text-muted-foreground bg-[#0f0f0f] border border-border rounded-lg px-3 py-2">
                {referralLink}
              </div>
              <Button variant="outline" onClick={copyLink} className="flex items-center gap-2">
                {copied ? 'Copied' : 'Copy'}
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral List Table */}
      <div className="bg-black rounded-lg overflow-hidden border border-border">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 font-medium text-muted-foreground">User</th>
                <th className="p-4 font-medium text-muted-foreground">Joined</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Trades</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Traded Volume</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Reward</th>
                <th className="p-4 font-medium text-muted-foreground text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{r.name}</span>
                      <span className="text-sm text-muted-foreground">{r.email}</span>
                    </div>
                  </td>
                  <td className="p-4">{new Date(r.joinedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">{r.trades}</td>
                  <td className="p-4 text-right">${r.volumeUsd.toLocaleString()}</td>
                  <td className="p-4 text-right">${r.rewardUsd.toLocaleString()}</td>
                  <td className="p-4 text-center">{getReferralStatusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden p-4 space-y-4">
          {referrals.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-foreground">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.email}</div>
                </div>
                {getReferralStatusBadge(r.status)}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Joined</div>
                <div>{new Date(r.joinedAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Trades</div>
                <div>{r.trades}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Volume</div>
                <div>${r.volumeUsd.toLocaleString()}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Reward</div>
                <div className="text-green-400">${r.rewardUsd.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
