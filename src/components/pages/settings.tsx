"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useState } from "react";

export function SettingsPage() {
  const { user, logout } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-black flex items-center justify-center">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt="avatar" width={56} height={56} className="w-14 h-14 object-cover" />
                ) : (
                  <div className="text-xl font-semibold text-white">{user?.displayName?.[0] || "U"}</div>
                )}
              </div>
              <div>
                <div className="font-semibold text-foreground">{user?.displayName || "Guest"}</div>
                <div className="text-sm text-muted-foreground">{user?.email || "Not signed in"}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Display Name</div>
                <Input defaultValue={user?.displayName || ""} placeholder="Your name" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <Input defaultValue={user?.email || ""} placeholder="Email" type="email" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email notifications</div>
                <div className="text-sm text-muted-foreground">Receive portfolio and security updates</div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Price alerts</div>
                <div className="text-sm text-muted-foreground">Get alerts for significant price moves</div>
              </div>
              <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
            </div>
            <div className="pt-2">
              <Button variant="outline">Manage connected wallets</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">Protect your account with secure sign-in</div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Sign out</div>
                <div className="text-sm text-muted-foreground">Sign out of this device</div>
              </div>
              <Button variant="destructive" onClick={logout}>Sign out</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



