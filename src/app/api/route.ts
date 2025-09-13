import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  
  const apiDocumentation = {
    name: "Goji Stocks Stablecoin API",
    version: "1.0.0",
    description: "Backend API for the Goji Stocks Stablecoin trading platform",
    baseUrl: `${baseUrl}/api`,
    endpoints: {
      health: {
        url: `${baseUrl}/api/health`,
        methods: ["GET", "POST"],
        description: "Health check endpoint for monitoring service status",
        examples: {
          "GET /api/health": "Basic health check with system information",
          "POST /api/health": "Detailed health check with custom parameters"
        }
      },
      crypto: {
        url: `${baseUrl}/api/crypto`,
        methods: ["GET", "POST"],
        description: "Cryptocurrency data endpoints",
        queryParameters: {
          symbol: "Filter by cryptocurrency symbol or name (optional)",
          limit: "Limit number of results (optional)",
          sort: "Sort by: marketCap, price, change, volume (default: marketCap)"
        },
        examples: {
          "GET /api/crypto": "Get all cryptocurrencies",
          "GET /api/crypto?symbol=BTC": "Get Bitcoin data",
          "GET /api/crypto?limit=5&sort=price": "Get top 5 cryptocurrencies by price"
        }
      },
      stocks: {
        url: `${baseUrl}/api/stocks`,
        methods: ["GET", "POST"],
        description: "Stock data endpoints",
        queryParameters: {
          symbol: "Filter by stock symbol or name (optional)",
          limit: "Limit number of results (optional)",
          sort: "Sort by: marketCap, price, change, volume (default: marketCap)"
        },
        examples: {
          "GET /api/stocks": "Get all stocks",
          "GET /api/stocks?symbol=AAPL": "Get Apple stock data",
          "GET /api/stocks?limit=3&sort=volume": "Get top 3 stocks by volume"
        }
      }
    },
    responseFormat: {
      success: {
        success: true,
        data: "Array or object containing the requested data",
        meta: {
          total: "Number of items returned",
          timestamp: "ISO timestamp of the response",
          sort: "Sort parameter used",
          limit: "Limit parameter used"
        }
      },
      error: {
        success: false,
        error: "Error type description",
        message: "Detailed error message"
      }
    },
    statusCodes: {
      200: "Success",
      201: "Created",
      400: "Bad Request",
      404: "Not Found",
      500: "Internal Server Error"
    },
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(apiDocumentation, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}
