"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { TradingPanel } from "@/components/trading-panel";
import { AssetsPage } from "@/components/pages/assets";
import { TransactionsPage } from "@/components/pages/transactions";
import { EarnPage } from "@/components/pages/earn";
import { LearningPage } from "@/components/pages/learning";
import { CryptoList } from "@/components/crypto-list";
import { SettingsPage } from "@/components/pages/settings";

type Page = "home" | "assets" | "transactions" | "earn" | "learning" | "trade" | "settings";

export function Layout() {
  const [activePage, setActivePage] = useState<Page>("trade");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <CryptoList />;
      case "assets":
        return <AssetsPage />;
      case "transactions":
        return <TransactionsPage />;
      case "earn":
        return <EarnPage />;
      case "learning":
        return <LearningPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <CryptoList />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
          <TradingPanel />
          
        </div>
      </div>
    </div>
  );
}
