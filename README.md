#  Finance Tracker - Full Stack Application

A full-stack finance tracking application built with Node.js, Express, MongoDB, and React.

## Features

-  User authentication (Register & Login) with JWT
-  Add, edit, and delete transactions
-  View all transactions with details
-  Real-time balance calculation
-  Monthly income/expense summary
-  Clean and intuitive user interface
-  Responsive design for mobile and desktop

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- CSS for styling

## Project Structure

```
FinanceTracker/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Transaction.js     # Transaction schema
│   ├── routes/
│   │   ├── auth.js            # Register & Login routes
│   │   └── transactions.js    # Transaction CRUD routes
│   ├── .env.example           # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Main server file
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── TransactionForm.css
    │   │   └── TransactionForm.js
    │   ├── services/
    │   │   └── api.js         # API service layer
    │   ├── App.css
    │   ├── App.js
    │   └── index.js
    ├── .gitignore
    └── package.json
```

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Community Edition) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### Step 1: Install MongoDB

**For macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Windows:**
1. Download MongoDB Community Server from the official website
2. Install and run as a service
3. MongoDB will run on `mongodb://localhost:27017`

**For Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Set Up Backend

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Edit the `.env` file if needed (default values should work):
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

5. Start the backend server:
```bash
npm start
```

You should see:
```
Server running on port 5001
MongoDB connected successfully
```

### Step 3: Set Up Frontend

1. Open a **new terminal window** and navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

##  How to Use the App

### 1. Register a New Account
- Open `http://localhost:3000` in your browser
- Click "Register here" 
- Fill in your name, email, and password
- Click "Register"

### 2. Login
- Enter your email and password
- Click "Login"
- You'll be redirected to the dashboard

### 3. Add Transactions
- Click "+ Add Transaction" button
- Choose transaction type (Income or Expense)
- Enter amount, category, date, and optional note
- Click "Add"

### 4. Edit Transactions
- Click "✏️ Edit" on any transaction
- Update the details
- Click "Update"

### 5. Delete Transactions
- Click "🗑️ Delete" on any transaction
- Confirm deletion

### 6. View Summary
- See your total balance at the top
- View total income and expenses
- Check current month's financial summary

## 📊 Sample Data

Here are some example transactions you can add:

**Income:**
- Salary: $5000 (Monthly)
- Freelance: $800 (Project payment)
- Investment: $200 (Dividend)

**Expenses:**
- Rent: $1200 (Bills)
- Groceries: $300 (Food)
- Transportation: $150 (Transport)
- Entertainment: $100 (Movies, dining)

## API Endpoints

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
```

### Transactions (Protected - Requires JWT Token)
```
GET    /api/transactions              # Get all transactions
GET    /api/transactions/:id          # Get single transaction
POST   /api/transactions              # Create transaction
PUT    /api/transactions/:id          # Update transaction
DELETE /api/transactions/:id          # Delete transaction
GET    /api/transactions/summary/stats # Get balance summary
```

## 📝 Example API Calls

### Register User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Transaction (Replace YOUR_TOKEN with actual token)
```bash
curl -X POST http://localhost:5001/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 50,
    "type": "expense",
    "category": "Food",
    "note": "Grocery shopping",
    "date": "2025-11-23"
  }'
```

### Get All Transactions
```bash
curl -X GET http://localhost:5001/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Summary
```bash
curl -X GET http://localhost:5001/api/transactions/summary/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `brew services list` (macOS) or check Windows Services
- Check if the connection string in `.env` is correct
- Try: `mongosh` to test MongoDB connection

### Port Already in Use
- Backend (5001): Change `PORT` in `.env` file
- Frontend (3000): The app will prompt you to use a different port

### CORS Error
- Make sure backend is running on port 5000
- Check that `cors` is installed in backend
- Verify API URL in `frontend/src/services/api.js`

### Token Issues
- Clear browser localStorage and login again
- Check if JWT_SECRET is set in backend `.env`

##  Customization

### Change Colors
Edit the CSS files in `frontend/src/components/`:
- `Auth.css` - Login/Register pages
- `Dashboard.css` - Main dashboard
- `TransactionForm.css` - Transaction form modal

### Add More Categories
Edit `TransactionForm.js` and add to the `categories` object:
```javascript
const categories = {
  income: ['Salary', 'Freelance', 'Your Category'],
  expense: ['Food', 'Transport', 'Your Category']
};
```

##  Production Deployment

### Backend
1. Set up MongoDB Atlas (cloud database)
2. Update `MONGODB_URI` in `.env`
3. Deploy to platforms like Heroku, Render, or Railway
4. Set environment variables in hosting platform

### Frontend
1. Update API URL in `frontend/src/services/api.js`
2. Build the app: `npm run build`
3. Deploy to Netlify, Vercel, or GitHub Pages

##  Contributing

This is a beginner-friendly project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

##  Author

Built as a beginner-friendly finance tracker tutorial project.

##  Acknowledgments

- React documentation
- Express.js documentation
- MongoDB documentation
- The open-source community

---

**Happy tracking! **

For questions or issues, please open an issue on GitHub or contact the maintainer.
