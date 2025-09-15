import { NextRequest, NextResponse } from 'next/server';

// Mock crypto data - in a real app, this would come from a database or external API
const cryptoData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 120512.26,
    change: 0.12,
    changePercent: 0.12,
    marketCap: 1080000000000,
    volume: 25000000000,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    isPositive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3638.62,
    change: 1.06,
    changePercent: 1.06,
    marketCap: 439000000000,
    volume: 15000000000,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    isPositive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 183.55,
    change: -0.85,
    changePercent: -0.85,
    marketCap: 98700000000,
    volume: 8000000000,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    isPositive: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 4,
    name: "USDC",
    symbol: "USDC",
    price: 1.00,
    change: 0.00,
    changePercent: 0.00,
    marketCap: 1000000000000,
    volume: 1000000000000,
    image: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png",
    isPositive: true,
    lastUpdated: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort') || 'marketCap';

    let filteredData = [...cryptoData];

    // Filter by symbol if provided
    if (symbol) {
      filteredData = filteredData.filter(crypto =>
        crypto.symbol.toLowerCase().includes(symbol.toLowerCase()) ||
        crypto.name.toLowerCase().includes(symbol.toLowerCase())
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
      const limitNum = parseInt(limit, 10);
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
    console.error('Crypto API error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch crypto data',
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

    // In a real app, this would validate and store new crypto data
    return NextResponse.json({
      success: true,
      message: 'Crypto data would be created here',
      receivedData: body,
      timestamp: new Date().toISOString()
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Crypto POST error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to process crypto data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
