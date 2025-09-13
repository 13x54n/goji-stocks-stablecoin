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

type Page = "home" | "assets" | "transactions" | "earn" | "learning" | "trade";

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
        {/* Header */}
        <Header />
        
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
          
          {/* Trading Panel - Only show on trade page */}
          {activePage === "trade" && <TradingPanel />}
        </div>
      </div>
    </div>
  );
}
