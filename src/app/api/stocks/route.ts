import { NextRequest, NextResponse } from 'next/server';

// Tokenized stocks data with Solana and Ethereum addresses
const stocksData = [
  {
    id: 1,
    name: "Abbott xStock",
    symbol: "ABTx",
    price: 120.45,
    change: 1.25,
    changePercent: 1.05,
    marketCap: 215000000000,
    volume: 2500000,
    image: "https://logo.clearbit.com/abbott.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsHtf5Rp...6yYvULr7",
      ethereum: "0x892333...5fedd06e"
    }
  },
  {
    id: 2,
    name: "AbbVie xStock",
    symbol: "ABBVx",
    price: 158.92,
    change: -0.85,
    changePercent: -0.53,
    marketCap: 278000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/abbvie.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XswbinNK...eQSSQoie",
      ethereum: "0xfbf239...1c742a6a"
    }
  },
  {
    id: 3,
    name: "Accenture xStock",
    symbol: "ACNx",
    price: 342.18,
    change: 2.15,
    changePercent: 0.63,
    marketCap: 218000000000,
    volume: 1200000,
    image: "https://logo.clearbit.com/accenture.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs5UJzmC...rRAB1JSU",
      ethereum: "0x03183c...0c35bbeb"
    }
  },
  {
    id: 4,
    name: "Alphabet xStock",
    symbol: "GOOGLx",
    price: 142.56,
    change: 3.12,
    changePercent: 2.24,
    marketCap: 1780000000000,
    volume: 28000000,
    image: "https://logo.clearbit.com/google.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsCPL9dN...diLLq6aN",
      ethereum: "0xe92f67...807e803f"
    }
  },
  {
    id: 5,
    name: "Amazon xStock",
    symbol: "AMZNx",
    price: 155.23,
    change: -0.45,
    changePercent: -0.29,
    marketCap: 1610000000000,
    volume: 22000000,
    image: "https://logo.clearbit.com/amazon.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs3eBt7u...Ba8LLZsg",
      ethereum: "0x3557ba...87195081"
    }
  },
  {
    id: 6,
    name: "Amber xStock",
    symbol: "AMBRx",
    price: 89.34,
    change: 1.85,
    changePercent: 2.11,
    marketCap: 125000000000,
    volume: 850000,
    image: "https://logo.clearbit.com/amber.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsaQTCge...RwrEhAzb",
      ethereum: "0x2f9a35...3dc6e763"
    }
  },
  {
    id: 7,
    name: "Apple xStock",
    symbol: "AAPLx",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    marketCap: 2800000000000,
    volume: 45000000,
    image: "https://logo.clearbit.com/apple.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsbEhLAt...udRLJzJp",
      ethereum: "0x9d2756...75ec890a"
    }
  },
  {
    id: 8,
    name: "AppLovin xStock",
    symbol: "APPx",
    price: 67.89,
    change: -1.23,
    changePercent: -1.78,
    marketCap: 22500000000,
    volume: 1200000,
    image: "https://logo.clearbit.com/applovin.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsPdAVBi...h7AYgPHV",
      ethereum: "0x50a129...46927be1"
    }
  },
  {
    id: 9,
    name: "AstraZeneca xStock",
    symbol: "AZNx",
    price: 68.45,
    change: 0.95,
    changePercent: 1.41,
    marketCap: 214000000000,
    volume: 3200000,
    image: "https://logo.clearbit.com/astrazeneca.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs3ZFkPY...Q1z3wAKU",
      ethereum: "0x5d6425...55d8daa2"
    }
  },
  {
    id: 10,
    name: "Bank of America xStock",
    symbol: "BACx",
    price: 34.67,
    change: 0.78,
    changePercent: 2.30,
    marketCap: 275000000000,
    volume: 18000000,
    image: "https://logo.clearbit.com/bankofamerica.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XswsQk4d...LHXCaEQP",
      ethereum: "0x314938...c346d7f2"
    }
  },
  {
    id: 11,
    name: "Berkshire Hathaway xStock",
    symbol: "BRK.Bx",
    price: 412.89,
    change: -2.15,
    changePercent: -0.52,
    marketCap: 605000000000,
    volume: 850000,
    image: "https://logo.clearbit.com/berkshirehathaway.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs6B6zaw...WKcNb45x",
      ethereum: "0x129926...ee23b50d"
    }
  },
  {
    id: 12,
    name: "Broadcom xStock",
    symbol: "AVGOx",
    price: 1289.34,
    change: 15.67,
    changePercent: 1.23,
    marketCap: 542000000000,
    volume: 1200000,
    image: "https://logo.clearbit.com/broadcom.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsgSaSvN...fH3cPJGo",
      ethereum: "0x38bac6...1e336565"
    }
  },
  {
    id: 13,
    name: "Chevron xStock",
    symbol: "CVXx",
    price: 156.78,
    change: 2.34,
    changePercent: 1.51,
    marketCap: 291000000000,
    volume: 4200000,
    image: "https://logo.clearbit.com/chevron.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsNNMt7W...cnTRRHts",
      ethereum: "0xad5cdc...a09eb4c0"
    }
  },
  {
    id: 14,
    name: "Circle xStock",
    symbol: "CRCLx",
    price: 45.67,
    change: -0.89,
    changePercent: -1.91,
    marketCap: 78000000000,
    volume: 2500000,
    image: "https://logo.clearbit.com/circle.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsueG8Bt...YZ3p3bd1",
      ethereum: "0xfebded...491deceb"
    }
  },
  {
    id: 15,
    name: "Cisco xStock",
    symbol: "CSCOx",
    price: 52.34,
    change: 0.67,
    changePercent: 1.30,
    marketCap: 211000000000,
    volume: 8500000,
    image: "https://logo.clearbit.com/cisco.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xsr3pdLQ...Yp4YoNFf",
      ethereum: "0x053c78...c1a3ff16"
    }
  },
  {
    id: 16,
    name: "Coca-Cola xStock",
    symbol: "KOx",
    price: 61.23,
    change: 0.45,
    changePercent: 0.74,
    marketCap: 264000000000,
    volume: 6500000,
    image: "https://logo.clearbit.com/coca-cola.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsaBXg8d...yBJ3AykQ",
      ethereum: "0xdcc1a2...c791129b"
    }
  },
  {
    id: 17,
    name: "Coinbase xStock",
    symbol: "COINx",
    price: 234.56,
    change: 8.45,
    changePercent: 3.74,
    marketCap: 56000000000,
    volume: 3200000,
    image: "https://logo.clearbit.com/coinbase.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs7ZdzSH...GQtePxNu",
      ethereum: "0x364f21...124096f0"
    }
  },
  {
    id: 18,
    name: "Comcast xStock",
    symbol: "CMCSAx",
    price: 43.12,
    change: -0.78,
    changePercent: -1.78,
    marketCap: 175000000000,
    volume: 4200000,
    image: "https://logo.clearbit.com/comcast.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsvKCaNs...k9P8kcS8",
      ethereum: "0xbc7170...b25e39f4"
    }
  },
  {
    id: 19,
    name: "CrowdStrike xStock",
    symbol: "CRWDx",
    price: 345.67,
    change: 12.34,
    changePercent: 3.70,
    marketCap: 84000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/crowdstrike.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs7xXqkc...YjUePYDw",
      ethereum: "0x214151...554a7345"
    }
  },
  {
    id: 20,
    name: "Danaher xStock",
    symbol: "DHRx",
    price: 267.89,
    change: 3.45,
    changePercent: 1.31,
    marketCap: 197000000000,
    volume: 1200000,
    image: "https://logo.clearbit.com/danaher.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xseo8tgC...Gh53GtCV",
      ethereum: "0xdba228...300405f4"
    }
  },
  {
    id: 21,
    name: "DFDV xStock",
    symbol: "DFDVx",
    price: 89.12,
    change: 1.45,
    changePercent: 1.65,
    marketCap: 45000000000,
    volume: 850000,
    image: "https://logo.clearbit.com/dfdv.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xs2yquAg...CWjTLyPy",
      ethereum: "0x521860...d990c6e7"
    }
  },
  {
    id: 22,
    name: "Eli Lilly xStock",
    symbol: "LLYx",
    price: 567.89,
    change: 12.34,
    changePercent: 2.22,
    marketCap: 542000000000,
    volume: 1200000,
    image: "https://logo.clearbit.com/lilly.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xsnuv4om...Lqi6gKMH",
      ethereum: "0x19c41e...a2ed0be4"
    }
  },
  {
    id: 23,
    name: "Exxon Mobil xStock",
    symbol: "XOMx",
    price: 112.45,
    change: -1.23,
    changePercent: -1.08,
    marketCap: 468000000000,
    volume: 8500000,
    image: "https://logo.clearbit.com/exxonmobil.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsaHND8s...mmcNL5qh",
      ethereum: "0xeedb02...550ffa13"
    }
  },
  {
    id: 24,
    name: "Gamestop xStock",
    symbol: "GMEx",
    price: 23.45,
    change: 2.34,
    changePercent: 11.08,
    marketCap: 7500000000,
    volume: 25000000,
    image: "https://logo.clearbit.com/gamestop.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xsf9mBkt...cFGxPRGc",
      ethereum: "0xe5f6d3...3763160d"
    }
  },
  {
    id: 25,
    name: "Gold xStock",
    symbol: "GLDx",
    price: 189.67,
    change: 1.23,
    changePercent: 0.65,
    marketCap: 89000000000,
    volume: 3200000,
    image: "https://logo.clearbit.com/spdrgoldshares.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xsv9hRk1...wmwtD3re",
      ethereum: "0x2380f2...e0e69da9"
    }
  },
  {
    id: 26,
    name: "Goldman Sachs xStock",
    symbol: "GSx",
    price: 445.67,
    change: -2.15,
    changePercent: -0.48,
    marketCap: 152000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/goldmansachs.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsgaUyp4...sbAq5ZD1",
      ethereum: "0x3ee7e9...b04ab149"
    }
  },
  {
    id: 27,
    name: "Home Depot xStock",
    symbol: "HDx",
    price: 378.45,
    change: 4.56,
    changePercent: 1.22,
    marketCap: 387000000000,
    volume: 4200000,
    image: "https://logo.clearbit.com/homedepot.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XszjVtyh...rk7fGKD3",
      ethereum: "0x766b0c...28501ba9"
    }
  },
  {
    id: 28,
    name: "Honeywell xStock",
    symbol: "HONx",
    price: 234.56,
    change: 1.89,
    changePercent: 0.81,
    marketCap: 158000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/honeywell.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsRbLZth...eW7oKqA2",
      ethereum: "0x62a485...7aa8ff1b"
    }
  },
  {
    id: 29,
    name: "Intel xStock",
    symbol: "INTCx",
    price: 45.67,
    change: -0.89,
    changePercent: -1.91,
    marketCap: 185000000000,
    volume: 12500000,
    image: "https://logo.clearbit.com/intel.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XshPgPdX...qzohmArM",
      ethereum: "0xf8a80d...46f3b3c8"
    }
  },
  {
    id: 30,
    name: "International Business Machines xStock",
    symbol: "IBMx",
    price: 167.89,
    change: 2.34,
    changePercent: 1.41,
    marketCap: 152000000000,
    volume: 3200000,
    image: "https://logo.clearbit.com/ibm.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XspwhyYP...tVfmCbSr",
      ethereum: "0xd99132...6f310aac"
    }
  },
  {
    id: 31,
    name: "Johnson & Johnson xStock",
    symbol: "JNJx",
    price: 156.78,
    change: 0.45,
    changePercent: 0.29,
    marketCap: 405000000000,
    volume: 8500000,
    image: "https://logo.clearbit.com/jnj.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsGVi5eo...m5XcX6Dn",
      ethereum: "0xdb0482...b16e917c"
    }
  },
  {
    id: 32,
    name: "JPMorgan Chase xStock",
    symbol: "JPMx",
    price: 189.34,
    change: 3.45,
    changePercent: 1.86,
    marketCap: 542000000000,
    volume: 8500000,
    image: "https://logo.clearbit.com/jpmorganchase.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsMAqkcK...WgCpLV2C",
      ethereum: "0xd9fc3e...207dea0a"
    }
  },
  {
    id: 33,
    name: "Linde xStock",
    symbol: "LINx",
    price: 445.67,
    change: 5.67,
    changePercent: 1.29,
    marketCap: 218000000000,
    volume: 850000,
    image: "https://logo.clearbit.com/linde.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsSr8anD...8LdmtE8Z",
      ethereum: "0x15059c...6402cd49"
    }
  },
  {
    id: 34,
    name: "Marvell xStock",
    symbol: "MRVLx",
    price: 67.89,
    change: -1.23,
    changePercent: -1.78,
    marketCap: 58000000000,
    volume: 4200000,
    image: "https://logo.clearbit.com/marvell.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsuxRGDz...wwRjVCJA",
      ethereum: "0xeaad46...1deaec88"
    }
  },
  {
    id: 35,
    name: "Mastercard xStock",
    symbol: "MAx",
    price: 456.78,
    change: 8.45,
    changePercent: 1.89,
    marketCap: 405000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/mastercard.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsApJFV9...faBoYLKC",
      ethereum: "0xb365cd...f6b622c6"
    }
  },
  {
    id: 36,
    name: "McDonald's xStock",
    symbol: "MCDx",
    price: 289.45,
    change: 2.34,
    changePercent: 0.82,
    marketCap: 212000000000,
    volume: 1800000,
    image: "https://logo.clearbit.com/mcdonalds.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsqE9cRR...mGSxAWT2",
      ethereum: "0x80a77a...02e2da67"
    }
  },
  {
    id: 37,
    name: "Medtronic xStock",
    symbol: "MDTx",
    price: 78.90,
    change: 0.67,
    changePercent: 0.86,
    marketCap: 105000000000,
    volume: 4200000,
    image: "https://logo.clearbit.com/medtronic.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsDgw22q...QhEK22u2",
      ethereum: "0x0588e8...daf21d46"
    }
  },
  {
    id: 38,
    name: "Merck xStock",
    symbol: "MRKx",
    price: 123.45,
    change: -1.23,
    changePercent: -0.99,
    marketCap: 312000000000,
    volume: 6500000,
    image: "https://logo.clearbit.com/merck.com",
    isPositive: false,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XsnQnU7A...kjX1Sd1X",
      ethereum: "0x17d818...6697dc40"
    }
  },
  {
    id: 39,
    name: "Meta xStock",
    symbol: "METAx",
    price: 485.12,
    change: 12.34,
    changePercent: 2.61,
    marketCap: 1230000000000,
    volume: 12500000,
    image: "https://logo.clearbit.com/meta.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "Xsa62P5m...fmPCo5Zu",
      ethereum: "0x96702b...e4ec989a"
    }
  },
  {
    id: 40,
    name: "Microsoft xStock",
    symbol: "MSFTx",
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    marketCap: 2800000000000,
    volume: 22000000,
    image: "https://logo.clearbit.com/microsoft.com",
    isPositive: true,
    lastUpdated: new Date().toISOString(),
    addresses: {
      solana: "XspzcW1P...Ueh3dRMX",
      ethereum: "0x562173...19aa6b35"
    }
  },
  {
    id: 41, name: "MicroStrategy xStock", symbol: "MSTRx", price: 456.78, change: 15.67, changePercent: 3.55, marketCap: 85000000000, volume: 850000, image: "https://logo.clearbit.com/microstrategy.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsP7xzNP...nHjdxxyZ", ethereum: "0xae2f84...f649b08e" }
  },
  {
    id: 42, name: "Nasdaq xStock", symbol: "QQQx", price: 445.67, change: 3.45, changePercent: 0.78, marketCap: 185000000000, volume: 12000000, image: "https://logo.clearbit.com/nasdaq.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xs8S1uUs...3gWAmWHZ", ethereum: "0xa753a7...60f250af" }
  },
  {
    id: 43, name: "Netflix xStock", symbol: "NFLXx", price: 612.45, change: -8.45, changePercent: -1.36, marketCap: 270000000000, volume: 8500000, image: "https://logo.clearbit.com/netflix.com", isPositive: false, lastUpdated: new Date().toISOString(), addresses: { solana: "XsEH7wWf...11KmzVpL", ethereum: "0xa6a65a...e5ebf961" }
  },
  {
    id: 44, name: "Novo Nordisk xStock", symbol: "NVOx", price: 123.45, change: 2.34, changePercent: 1.93, marketCap: 285000000000, volume: 4200000, image: "https://logo.clearbit.com/novonordisk.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsfAzPzY...GC87S57n", ethereum: "0xf9523e...3d8b147e" }
  },
  {
    id: 45, name: "NVIDIA xStock", symbol: "NVDAx", price: 875.34, change: 25.67, changePercent: 3.02, marketCap: 2100000000000, volume: 25000000, image: "https://logo.clearbit.com/nvidia.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xsc9qvGR...SPmx9qEh", ethereum: "0xc845b2...5fe0849d" }
  },
  {
    id: 46, name: "OPEN xStock", symbol: "OPENx", price: 23.45, change: -1.23, changePercent: -4.99, marketCap: 18000000000, volume: 8500000, image: "https://logo.clearbit.com/open.com", isPositive: false, lastUpdated: new Date().toISOString(), addresses: { solana: "XsGtpmjh...gF8bhGv6", ethereum: "0xbee6b6...44825e66" }
  },
  {
    id: 47, name: "Oracle xStock", symbol: "ORCLx", price: 123.45, change: 1.23, changePercent: 1.01, marketCap: 340000000000, volume: 8500000, image: "https://logo.clearbit.com/oracle.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsjFwUPi...xoQAQjeL", ethereum: "0x548308...6a6e4971" }
  },
  {
    id: 48, name: "Palantir xStock", symbol: "PLTRx", price: 23.45, change: 1.23, changePercent: 5.54, marketCap: 52000000000, volume: 25000000, image: "https://logo.clearbit.com/palantir.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsoBhf2u...dpzriAA4", ethereum: "0x6d482c...6170f8e2" }
  },
  {
    id: 49, name: "PepsiCo xStock", symbol: "PEPx", price: 167.89, change: 0.45, changePercent: 0.27, marketCap: 230000000000, volume: 4200000, image: "https://logo.clearbit.com/pepsico.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xsv99frT...2Pez91vF", ethereum: "0x36c424...7857413e" }
  },
  {
    id: 50, name: "Pfizer xStock", symbol: "PFEx", price: 28.90, change: -0.45, changePercent: -1.53, marketCap: 162000000000, volume: 8500000, image: "https://logo.clearbit.com/pfizer.com", isPositive: false, lastUpdated: new Date().toISOString(), addresses: { solana: "XsAtbqkA...h861X8rw", ethereum: "0x1ac765...f1444a9e" }
  },
  {
    id: 51, name: "Philip Morris xStock", symbol: "PMx", price: 98.45, change: 1.23, changePercent: 1.26, marketCap: 152000000000, volume: 3200000, image: "https://logo.clearbit.com/philipmorris.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xsba6tUn...5hKn5vT3", ethereum: "0x02a6c1...3c94f4f9" }
  },
  {
    id: 52, name: "Procter & Gamble xStock", symbol: "PGx", price: 156.78, change: 0.67, changePercent: 0.43, marketCap: 370000000000, volume: 6500000, image: "https://logo.clearbit.com/pg.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsYdjDjN...LAGJrhzV", ethereum: "0xa90424...dd1318fd" }
  },
  {
    id: 53, name: "Robinhood xStock", symbol: "HOODx", price: 18.45, change: 0.89, changePercent: 5.07, marketCap: 16500000000, volume: 8500000, image: "https://logo.clearbit.com/robinhood.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsvNBAYk...HZ56bzpg", ethereum: "0xe1385f...a9084015" }
  },
  {
    id: 54, name: "Salesforce xStock", symbol: "CRMx", price: 267.89, change: 3.45, changePercent: 1.31, marketCap: 260000000000, volume: 4200000, image: "https://logo.clearbit.com/salesforce.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsczbcQ3...QEXi4kaN", ethereum: "0x4a4073...7f6f54a2" }
  },
  {
    id: 55, name: "SP500 xStock", symbol: "SPYx", price: 545.67, change: 2.34, changePercent: 0.43, marketCap: 520000000000, volume: 45000000, image: "https://logo.clearbit.com/spdr.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsoCS1Tf...pnBbDF2W", ethereum: "0x90a2a4...a8f2dd48" }
  },
  {
    id: 56, name: "TBLL xStock", symbol: "TBLLx", price: 123.45, change: 0.45, changePercent: 0.37, marketCap: 85000000000, volume: 1800000, image: "https://logo.clearbit.com/tbll.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsqBC5tc...D6w7QEKp", ethereum: "0x4cbf89...2931299b" }
  },
  {
    id: 57, name: "Tesla xStock", symbol: "TSLAx", price: 248.87, change: -8.45, changePercent: -3.28, marketCap: 790000000000, volume: 85000000, image: "https://logo.clearbit.com/tesla.com", isPositive: false, lastUpdated: new Date().toISOString(), addresses: { solana: "XsDoVfqe...dqsJHzoB", ethereum: "0x8ad3c7...9aeb7cf0" }
  },
  {
    id: 58, name: "Thermo Fisher xStock", symbol: "TMOx", price: 567.89, change: 8.45, changePercent: 1.51, marketCap: 218000000000, volume: 850000, image: "https://logo.clearbit.com/thermofisher.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xs8drBWy...jWrsrk57", ethereum: "0xaf072f...18f83d19" }
  },
  {
    id: 59, name: "TQQQ xStock", symbol: "TQQQx", price: 67.89, change: 2.34, changePercent: 3.57, marketCap: 85000000000, volume: 8500000, image: "https://logo.clearbit.com/proshares.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsjQP3iM...g6TFomoc", ethereum: "0xfdddb5...9e69ac86" }
  },
  {
    id: 60, name: "UnitedHealth xStock", symbol: "UNHx", price: 545.67, change: 5.67, changePercent: 1.05, marketCap: 520000000000, volume: 1800000, image: "https://logo.clearbit.com/unitedhealthgroup.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XszvaiXG...6uyup6fe", ethereum: "0x167a63...66245048" }
  },
  {
    id: 61, name: "Vanguard xStock", symbol: "VTIx", price: 267.89, change: 1.23, changePercent: 0.46, marketCap: 285000000000, volume: 6500000, image: "https://logo.clearbit.com/vanguard.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsssYEQj...8F45cDr9", ethereum: "0xbd730e...f88a4777" }
  },
  {
    id: 62, name: "Visa xStock", symbol: "Vx", price: 278.90, change: 2.34, changePercent: 0.85, marketCap: 590000000000, volume: 4200000, image: "https://logo.clearbit.com/visa.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "XsqgsbXw...GGGcQZ2p", ethereum: "0x2363fd...a30c5293" }
  },
  {
    id: 63, name: "Walmart xStock", symbol: "WMTx", price: 167.89, change: 1.23, changePercent: 0.74, marketCap: 540000000000, volume: 8500000, image: "https://logo.clearbit.com/walmart.com", isPositive: true, lastUpdated: new Date().toISOString(), addresses: { solana: "Xs151Qeq...8Vy538ci", ethereum: "0x7aefc9...d4a97b21" }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort') || 'marketCap';

    let filteredData = [...stocksData];

    // Filter by symbol if provided
    if (symbol) {
      filteredData = filteredData.filter(stock =>
        stock.symbol.toLowerCase().includes(symbol.toLowerCase()) ||
        stock.name.toLowerCase().includes(symbol.toLowerCase())
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      switch (sort) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.changePercent - a.changePercent;
        case 'volume':
          return b.volume - a.volume;
        case 'marketCap':
        default:
          return b.marketCap - a.marketCap;
      }
    });

    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit, 100);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredData = filteredData.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      meta: {
        total: filteredData.length,
        timestamp: new Date().toISOString(),
        sort,
        limit: limit ? parseInt(limit, 10) : null
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      }
    });
  } catch (error) {
    console.error('Stocks API error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stocks data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real app, this would validate and store new stock data
    return NextResponse.json({
      success: true,
      message: 'Stock data would be created here',
      receivedData: body,
      timestamp: new Date().toISOString()
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Stocks POST error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to process stock data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
