import { NextRequest, NextResponse } from 'next/server';

// Mock stocks data - in a real app, this would come from a database or external API
const stocksData = [
  {
    id: 1,
    name: "Apple Inc",
    symbol: "AAPL",
    price: 175.43,
    change: 2.34,
    changePercent: 2.34,
    marketCap: 2800000000000,
    volume: 45000000,
    image: "https://logo.clearbit.com/apple.com",
    isPositive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    name: "Microsoft Corp.",
    symbol: "MSFT",
    price: 378.85,
    change: 1.87,
    changePercent: 1.87,
    marketCap: 2800000000000,
    volume: 22000000,
    image: "https://logo.clearbit.com/microsoft.com",
    isPositive: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 3,
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    price: 155.23,
    change: -0.45,
    changePercent: -0.45,
    marketCap: 1600000000000,
    volume: 18000000,
    image: "https://logo.clearbit.com/amazon.com",
    isPositive: false,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 4,
    name: "Tesla Inc.",
    symbol: "TSLA",
    price: 248.87,
    change: -1.23,
    changePercent: -1.23,
    marketCap: 790000000000,
    volume: 35000000,
    image: "https://logo.clearbit.com/tesla.com",
    isPositive: false,
    lastUpdated: new Date().toISOString()
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
