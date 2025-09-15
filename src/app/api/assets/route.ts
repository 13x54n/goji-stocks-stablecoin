import { NextRequest, NextResponse } from 'next/server';

// Mock portfolio assets spanning crypto and tokenized stocks
// price is in USD (number), value is derived on the fly from price * balance
const portfolioAssets = [
  // Crypto
  {
    id: 'btc',
    type: 'crypto',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    price: 120512.26,
    balance: 0.8452,
    changePercent: 0.55,
    isPositive: true,
  },
  {
    id: 'eth',
    type: 'crypto',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    price: 3638.62,
    balance: 12.341,
    changePercent: -0.45,
    isPositive: false,
  },
  {
    id: 'sol',
    type: 'crypto',
    name: 'Solana',
    symbol: 'SOL',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    price: 183.55,
    balance: 125.67,
    changePercent: -1.96,
    isPositive: false,
  },
  {
    id: 'usdc',
    type: 'crypto',
    name: 'USD Coin',
    symbol: 'USDC',
    image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    price: 1.0,
    balance: 5000.0,
    changePercent: 0,
    isPositive: true,
  },
  // Tokenized stocks (logos via Clearbit)
  {
    id: 'aaplx',
    type: 'stock',
    name: 'Apple xStock',
    symbol: 'AAPLx',
    image: 'https://logo.clearbit.com/apple.com',
    price: 175.43,
    balance: 48.0,
    changePercent: 1.35,
    isPositive: true,
  },
  {
    id: 'nvdax',
    type: 'stock',
    name: 'NVIDIA xStock',
    symbol: 'NVDAx',
    image: 'https://logo.clearbit.com/nvidia.com',
    price: 875.34,
    balance: 6.5,
    changePercent: 3.02,
    isPositive: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').toLowerCase();
    const type = searchParams.get('type'); // 'crypto' | 'stock' | undefined

    let list = [...portfolioAssets];

    if (type === 'crypto' || type === 'stock') {
      list = list.filter((a) => a.type === type);
    }

    if (q) {
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q)
      );
    }

    // derive value in USD for convenience
    const withDerived = list.map((a) => ({
      ...a,
      value: a.price * a.balance,
      lastUpdated: new Date().toISOString(),
    }));

    return NextResponse.json(
      {
        success: true,
        data: withDerived,
        meta: {
          total: withDerived.length,
          timestamp: new Date().toISOString(),
          type: type || null,
          q: q || null,
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
        },
      }
    );
  } catch (error) {
    console.error('Assets API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch assets',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


