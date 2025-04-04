const API_KEY = 'E5VA5UILL71QA48Y';
const BASE_URL = 'https://www.alphavantage.co/query';

// User data
const dummyUser = {
    username: "demo_user",
    password: "demo123",
    portfolio: [
        { symbol: "AAPL", name: "Apple Inc.", shares: 10, costBasis: 145.32 },
        { symbol: "MSFT", name: "Microsoft", shares: 5, costBasis: 280.15 },
        { symbol: "GOOGL", name: "Alphabet", shares: 3, costBasis: 125.75 },
        { symbol: "AMZN", name: "Amazon", shares: 2, costBasis: 110.50 },
        { symbol: "TSLA", name: "Tesla", shares: 8, costBasis: 240.00 }
    ]
};

// Cache for storing fetched prices
const priceCache = {};

async function fetchStockPrice(symbol) {
    if (priceCache[symbol] && (Date.now() - priceCache[symbol].timestamp) < 60000) {
        return priceCache[symbol].data;
    }

    try {
        const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json();
        
        if (data['Global Quote']) {
            const quote = data['Global Quote'];
            const result = {
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['10. change percent'].replace('%', ''))
            };
            priceCache[symbol] = {
                data: result,
                timestamp: Date.now()
            };
            return result;
        }
        throw new Error('Invalid API response');
    } catch (error) {
        console.error('Error fetching stock price:', error);
        return { price: 0, change: 0 };
    }
}

async function getUserPortfolio() {
    const portfolioWithPrices = await Promise.all(dummyUser.portfolio.map(async stock => {
        const marketInfo = await fetchStockPrice(stock.symbol);
        const currentValue = marketInfo.price * stock.shares;
        const costBasis = stock.costBasis * stock.shares;
        const gainLoss = currentValue - costBasis;
        const gainLossPercent = (gainLoss / costBasis) * 100;

        return {
            ...stock,
            currentPrice: marketInfo.price,
            change: marketInfo.change,
            currentValue: parseFloat(currentValue.toFixed(2)),
            gainLoss: parseFloat(gainLoss.toFixed(2)),
            gainLossPercent: parseFloat(gainLossPercent.toFixed(2))
        };
    }));
    return portfolioWithPrices;
}

// Export functions
window.getUserPortfolio = getUserPortfolio;
window.updateMarketPrices = () => {}; // No longer needed as we're using live data
