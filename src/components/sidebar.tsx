"use client";

import { Home, Clock, TrendingUp, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Page = "home" | "assets" | "transactions" | "earn" | "learning" | "trade";

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navigationItems = [
  { icon: Home, label: "Home", page: "trade" as Page },
  { icon: Clock, label: "My Assets", page: "assets" as Page },
  { icon: TrendingUp, label: "Transactions", page: "transactions" as Page },
  { icon: Award, label: "Earn", page: "earn" as Page },
  { icon: GraduationCap, label: "Learning", page: "learning" as Page },
];

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <div className="w-72 h-screen bg-black border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src="https://www.minginc.xyz/icons/icon.svg" alt="logo" width={52} height={52} className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;
            return (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  onClick={() => setActivePage(item.page)}
                  className={`w-full flex items-center text-lg font-semibold rounded-xl justify-start gap-3 h-12 cursor-pointer ${
                    isActive
                      ? "bg-[#fff] hover:bg-[#fff] text-[#000]"
                      : "text-sidebar-foreground hover:bg-[#fff] hover:text-[#000]"
                  }`}
                >
                  <Icon size={24} />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
