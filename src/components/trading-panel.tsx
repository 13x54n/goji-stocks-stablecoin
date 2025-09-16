"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, ChevronRight, ArrowUp, ArrowDown, Building2, Wallet, Search, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import { Switch } from "./ui/switch";

export function TradingPanel() {
  const [buyAmount, setBuyAmount] = useState("0");
  const [btcAmount, setBtcAmount] = useState("0");
  const [activeTab, setActiveTab] = useState("buy");
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [stockAssets, setStockAssets] = useState<any[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [assetsError, setAssetsError] = useState<string | null>(null);
  const [assetSearch, setAssetSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [showStocksInModal, setShowStocksInModal] = useState(false);
  // Pay-with modal state
  const [showPaySelector, setShowPaySelector] = useState(false);
  const [paySearch, setPaySearch] = useState("");
  const [selectedPayAsset, setSelectedPayAsset] = useState<any | null>(null);
  const [showStocksInPayModal, setShowStocksInPayModal] = useState(false);

  // Calculate dynamic font size based on input length
  const getFontSize = (value: string) => {
    const length = value.length;
    if (length <= 3) return "text-6xl"; // 3.75rem
    if (length <= 5) return "text-5xl"; // 3rem
    if (length <= 7) return "text-4xl"; // 2.25rem
    if (length <= 9) return "text-3xl"; // 1.875rem
    if (length <= 11) return "text-2xl"; // 1.5rem
    if (length <= 13) return "text-xl"; // 1.25rem
    return "text-lg"; // 1.125rem
  };

  // Fetch available cryptos for selector
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setAssetsLoading(true);
        const [cryptoRes, stocksRes] = await Promise.all([
          fetch('/api/crypto'),
          fetch('/api/stocks')
        ]);
        const cryptoJson = await cryptoRes.json();
        const stocksJson = await stocksRes.json();
        const cryptoList = Array.isArray(cryptoJson?.data) ? cryptoJson.data : [];
        const stocksList = Array.isArray(stocksJson?.data) ? stocksJson.data : [];
        setAssets(cryptoList);
        setStockAssets(stocksList);
        if (!selectedAsset && cryptoList.length > 0) {
          setSelectedAsset(cryptoList[0]);
        }
        if (!selectedPayAsset) {
          const usdc = cryptoList.find((c: any) => c.symbol?.toUpperCase() === 'USDC');
          setSelectedPayAsset(usdc || cryptoList[0] || null);
        }
        setAssetsError(null);
      } catch (e) {
        setAssetsError('Failed to load assets');
      } finally {
        setAssetsLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    const q = assetSearch.trim().toLowerCase();
    const source = showStocksInModal ? stockAssets : assets;
    if (!q) return source;
    return source.filter((a: any) =>
      a.name?.toLowerCase().includes(q) || a.symbol?.toLowerCase().includes(q)
    );
  }, [assetSearch, assets, stockAssets, showStocksInModal]);

  const filteredPayAssets = useMemo(() => {
    const q = paySearch.trim().toLowerCase();
    const source = showStocksInPayModal ? stockAssets : assets;
    if (!q) return source;
    return source.filter((a: any) =>
      a.name?.toLowerCase().includes(q) || a.symbol?.toLowerCase().includes(q)
    );
  }, [paySearch, assets, stockAssets, showStocksInPayModal]);

  // Calculate dynamic font size for CAD currency to match input
  const getCurrencyFontSize = (value: string) => {
    const length = value.length;
    if (length <= 3) return "text-6xl"; // Slightly smaller than input
    if (length <= 5) return "text-5xl";
    if (length <= 7) return "text-4xl";
    if (length <= 9) return "text-3xl";
    if (length <= 11) return "text-3xl";
    if (length <= 13) return "text-2xl";
    return "text-xl";
  };

  // Calculate dynamic width based on content length
  const getInputWidth = (value: string) => {
    const length = value.length;
    if (length <= 1) return "w-42"; // "0" + "CAD"
    if (length <= 3) return "w-60"; // "100" + "CAD"
    if (length <= 4) return "w-60"; // "1000" + "CAD"
    if (length <= 5) return "w-63"; // "10000" + "CAD"
    return "w-48"; // Very long numbers
  };

  // Handle input change with validation
  const handleAmountChange = (value: string) => {
    const numericValue = parseFloat(value);
    setBuyAmount(value);

    if (numericValue > 10000) {
      setShowLimitWarning(true);
    } else {
      setShowLimitWarning(false);
    }
  };

  return (
    <div className="w-90 h-screen bg-black border-l border-border p-6 overflow-y-auto">
      <p className="text-white text-xl font-semibold mb-2 border-b-4 border-border pb-4"></p>

      <div className="space-y-4">
        {/* Amount Input Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={buyAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className={`bg-transparent text-white border-0 outline-none focus:ring-0 focus:border-none font-semibold ${getInputWidth(buyAmount)} ${getFontSize(buyAmount)} ${showLimitWarning ? 'text-red-400' : ''}`}
            />
            <span className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#fff7] font-medium pointer-events-none select-none ${getCurrencyFontSize(buyAmount)} ${showLimitWarning ? 'text-red-400' : ''}`}>
              CAD
            </span>
          </div>
          <button className="bg-gray-800 text-#fff7 px-3 py-2 rounded-lg text-sm hover:bg-gray-700">
            Max
          </button>
        </div>
        {showLimitWarning && (
          <div className="text-red-400 text-sm mt-2">
            ⚠️ Maximum trading limit is $10,000 CAD
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <ArrowUpDown className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm">{btcAmount} BTC</span>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#111] border border-border cursor-pointer hover:bg-[#161616]" onClick={() => setShowPaySelector(true)}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${selectedPayAsset?.addresses ? 'bg-white p-1 rounded-full' : 'bg-black rounded-full'} flex items-center justify-center overflow-hidden`}>
                {selectedPayAsset?.image ? (
                  <Image src={selectedPayAsset.image} alt={selectedPayAsset?.name || 'pay asset'} width={36} height={36} className="w-9 h-9 object-contain" />
                ) : (
                  <span className="text-white font-semibold">$</span>
                )}
              </div>
              <div>
                <div className="text-white font-semibold">Pay with</div>
                <div className="text-[#fff7]">{selectedPayAsset?.name || 'Select asset'}</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[#cbd5e1]">CA$0.00</div>
              <div className="text-[#94a3b8]">Available</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94a3b8]" />
          </div>

          <div className="flex items-center p-3 rounded-xl bg-[#111] border border-border cursor-pointer hover:bg-[#161616] justify-between" onClick={() => setShowAssetSelector(true)}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${selectedAsset?.addresses ? 'bg-white p-1' : 'bg-black'} rounded-full flex items-center justify-center overflow-hidden`}>
                {selectedAsset?.image ? (
                  <Image src={selectedAsset.image} alt={selectedAsset?.name || 'asset'} width={36} height={36} className="w-9 h-9 object-contain" />
                ) : (
                  <span className="text-black font-bold">B</span>
                )}
              </div>
              <div>
                <div className="text-white font-semibold">Buy</div>
                <div className="text-[#fff7]">{selectedAsset?.name || 'Select asset'}</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94a3b8]" />
          </div>

          <button className="w-full py-4 rounded-3xl bg-[#2a2a2a] cursor-pointer transition-all duration-300 ease-in-out text-white font-semibold text-lg hover:bg-[#fff] hover:text-black">
            Review order
          </button>
        </div>
      </div>

      {/* Asset selector overlay */}
      {showAssetSelector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setShowAssetSelector(false)}>
          <div className="h-full flex items-start sm:items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowAssetSelector(false); }}>
            <div className="w-full max-w-lg bg-[#0b0b0b] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <button className="p-2 hover:bg-[#111] rounded" onClick={() => setShowAssetSelector(false)} aria-label="Back">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-white text-xl font-semibold">Select asset to buy</div>
              </div>
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] w-5 h-5" />
                  <input
                    value={assetSearch}
                    onChange={(e) => setAssetSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-[#1a1a1a] border border-border rounded-full py-3 pl-11 pr-4 text-white placeholder:text-[#94a3b8] outline-none"
                  />
                </div>
              </div>
              <div className="px-4 mb-2 flex items-center justify-between">
                <div className="text-white text-lg font-semibold">{showStocksInModal ? 'Tokenized Stocks' : 'Crypto'}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={!showStocksInModal ? 'text-white' : 'text-[#94a3b8]'}>Crypto</span>
                  <Switch checked={showStocksInModal} onCheckedChange={setShowStocksInModal} />
                  <span className={showStocksInModal ? 'text-white' : 'text-[#94a3b8]'}>Stocks</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {assetsLoading ? (
                  <div className="p-6 text-[#94a3b8]">Loading...</div>
                ) : assetsError ? (
                  <div className="p-6 text-red-400">{assetsError}</div>
                ) : (
                  <div className="pb-6">
                    {filteredAssets.map((a: any) => (
                      <div
                        key={a.symbol}
                        className="mx-4 mb-3 rounded-xl bg-[#0f0f0f] border border-border p-4 flex items-center justify-between hover:bg-[#141414] cursor-pointer"
                        onClick={() => { setSelectedAsset(a); setShowAssetSelector(false); }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${!showStocksInModal ? 'rounded-full' : ' bg-white p-1'} flex items-center justify-center overflow-hidden`}>
                            <Image src={a.image} alt={a.name} width={40} height={40} className="w-10 h-10 object-contain" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{a.name}</div>
                            <div className="text-[#94a3b8] text-sm">{a.symbol}</div>
                          </div>
                        </div>
                        <div className="flex items-end gap-4">
                          <div className="text-white">${a.price.toLocaleString()}</div>
                          <div className={`${a.isPositive ? 'text-green-400' : 'text-red-400'}`}>{a.changePercent.toFixed(2)}%</div>
                          {selectedAsset?.symbol === a.symbol && (
                            <Check className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay-with selector overlay */}
      {showPaySelector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setShowPaySelector(false)}>
          <div className="h-full flex items-start sm:items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowPaySelector(false); }}>
            <div className="w-full max-w-lg bg-[#0b0b0b] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <button className="p-2 hover:bg-[#111] rounded" onClick={() => setShowPaySelector(false)} aria-label="Back">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-white text-xl font-semibold">Select payment asset</div>
              </div>
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] w-5 h-5" />
                  <input
                    value={paySearch}
                    onChange={(e) => setPaySearch(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-[#1a1a1a] border border-border rounded-full py-3 pl-11 pr-4 text-white placeholder:text-[#94a3b8] outline-none"
                  />
                </div>
              </div>
              <div className="px-4 mb-2 flex items-center justify-between">
                <div className="text-white text-lg font-semibold">{showStocksInPayModal ? 'Tokenized Stocks' : 'Crypto'}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={!showStocksInPayModal ? 'text-white' : 'text-[#94a3b8]'}>Crypto</span>
                  <Switch checked={showStocksInPayModal} onCheckedChange={setShowStocksInPayModal} />
                  <span className={showStocksInPayModal ? 'text-white' : 'text-[#94a3b8]'}>Stocks</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {assetsLoading ? (
                  <div className="p-6 text-[#94a3b8]">Loading...</div>
                ) : assetsError ? (
                  <div className="p-6 text-red-400">{assetsError}</div>
                ) : (
                  <div className="pb-6">
                    {filteredPayAssets.map((a: any) => (
                      <div
                        key={`pay-${a.symbol}`}
                        className="mx-4 mb-3 rounded-xl bg-[#0f0f0f] border border-border p-4 flex items-center justify-between hover:bg-[#141414] cursor-pointer"
                        onClick={() => { setSelectedPayAsset(a); setShowPaySelector(false); }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${showStocksInPayModal ? 'bg-white p-1 rounded-full' : 'bg-black rounded-full'} flex items-center justify-center overflow-hidden`}>
                            <Image src={a.image} alt={a.name} width={40} height={40} className="w-10 h-10 object-contain" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{a.name}</div>
                            <div className="text-[#94a3b8] text-sm">{a.symbol}</div>
                          </div>
                        </div>
                        <div className="flex items-end gap-4">
                          <div className="text-white">${a.price.toLocaleString()}</div>
                          <div className={`${a.isPositive ? 'text-green-400' : 'text-red-400'}`}>{a.changePercent.toFixed(2)}%</div>
                          {selectedPayAsset?.symbol === a.symbol && (
                            <Check className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="space-y-1 mt-6 border-t-2 border-border mt-6">
        <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-300">Send crypto</span>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-300">Receive crypto</span>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-300">Deposit cash</span>
        </div>

        <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-300">Withdraw cash</span>
        </div>
      </div>

    </div >
  );
}
