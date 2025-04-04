document.addEventListener('DOMContentLoaded', function() {
    // Display username
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('usernameDisplay').textContent = username;
    }

    // Load and display stocks
    loadStocks();

    // Setup refresh button
    document.getElementById('refreshBtn').addEventListener('click', function() {
        // Show refresh animation
        const icon = this.querySelector('i');
        icon.classList.add('animate-spin');
        
        loadStocks().finally(() => {
            icon.classList.remove('animate-spin');
        });
    });
});

async function loadStocks() {
    const container = document.getElementById('stocksContainer');
    container.innerHTML = '<div class="col-span-full text-center py-8"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i><p class="mt-2">Loading stock data...</p></div>';

    try {
        const portfolio = await getUserPortfolio();
        container.innerHTML = '';

        portfolio.forEach(stock => {
            const changeClass = stock.change >= 0 ? 'text-green-500' : 'text-red-500';
            const changeIcon = stock.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
            const gainLossClass = stock.gainLoss >= 0 ? 'text-green-500' : 'text-red-500';

            const stockCard = document.createElement('div');
            stockCard.className = 'bg-white p-6 rounded-lg shadow-md';
            stockCard.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${stock.name}</h3>
                        <p class="text-gray-500">${stock.symbol}</p>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full ${stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${stock.shares} shares
                    </span>
                </div>
                
                <div class="mb-4">
                    <p class="text-gray-600">Current Price</p>
                    <p class="text-2xl font-bold">$${stock.currentPrice.toFixed(2)}</p>
                    <p class="${changeClass}">
                        <i class="fas ${changeIcon} mr-1"></i>
                        ${Math.abs(stock.change)}% ($${Math.abs((stock.currentPrice - stock.costBasis).toFixed(2))})
                    </p>
                </div>
                
                <div class="border-t pt-4">
                    <p class="text-gray-600">Total Value</p>
                    <p class="text-xl font-semibold">$${stock.currentValue.toFixed(2)}</p>
                    <p class="${gainLossClass}">
                        ${stock.gainLoss >= 0 ? 'Gain' : 'Loss'}: $${Math.abs(stock.gainLoss).toFixed(2)} (${Math.abs(stock.gainLossPercent).toFixed(2)}%)
                    </p>
                </div>
            `;
            container.appendChild(stockCard);
        });
    } catch (error) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8 text-red-500">
                <i class="fas fa-exclamation-triangle text-2xl"></i>
                <p class="mt-2">Failed to load stock data. Please try again.</p>
            </div>
        `;
        console.error('Error loading stocks:', error);
    }
}
