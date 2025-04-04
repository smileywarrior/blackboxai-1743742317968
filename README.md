
Built by https://www.blackbox.ai

---

```markdown
# Stock Tracker

## Project Overview
Stock Tracker is a web application designed to help users track their stock investments. The application provides a login interface and a dashboard displaying the user's stock portfolio, including current prices, changes, and gain/loss calculations. The project utilizes HTML, CSS (via Tailwind CSS), and JavaScript to create an interactive and responsive user experience.

## Installation
To run the Stock Tracker application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd stock-tracker
   ```

2. **Open the `index.html` file in your web browser:**
   You can do this by double-clicking the `index.html` file or by using a local HTTP server.

## Usage
1. Upon opening the application, you will see a login page.
2. Use the demo credentials to log in:
   - **Username:** `demo_user`
   - **Password:** `demo123`
3. After logging in, you will be taken to the dashboard, where you can view your stock portfolio.
4. You can click the "Refresh Prices" button to update the stock prices displayed in your portfolio.

## Features
- User authentication (demo credentials provided).
- Display of user portfolio with stock details.
- Real-time fetching of stock prices using the Alpha Vantage API.
- Gain/Loss calculations for stocks based on the user's cost basis.

## Dependencies
This project requires no external libraries other than those linked in the `index.html`:
- Tailwind CSS: CDN Link
- Font Awesome: CDN Link

## Project Structure
```
/stock-tracker
│
├── index.html          # Login page for the application
├── dashboard.html      # Dashboard for displaying user's stock portfolio
├── data.js             # Contains stock data, user data, and API interaction logic
└── scripts/            # Directory for JavaScript files
    ├── auth.js         # Authentication logic for user login/logout
    └── app.js          # Handles fetching and displaying stock information
```

### File Descriptions
- **index.html:** The entry point for the application where users can log in.
- **dashboard.html:** The main interface users see after logging in, displaying their stock portfolio.
- **data.js:** Manages API keys, stock data management, and provides functions to retrieve stock prices and user portfolio information.
- **scripts/auth.js:** Handles the login, logout, and session management processes.
- **scripts/app.js:** Contains logic for updating and rendering the stock information on the dashboard.

## License
This project is open-source. Feel free to contribute or modify as needed!
```
This README provides a concise yet comprehensive overview of the Stock Tracker project, detailing what it is, how to get it running, its features, and the structure of the project files.