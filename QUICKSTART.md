# Finance Tracker - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Install MongoDB
**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:** Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

### 3. Start Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```

### 4. Use the App
1. Open http://localhost:3000
2. Register a new account
3. Start adding transactions!

## 📝 Sample Transactions to Try

**Income:**
- Salary: $5000, Category: Salary
- Freelance: $800, Category: Freelance

**Expenses:**
- Rent: $1200, Category: Bills
- Groceries: $300, Category: Food
- Gas: $60, Category: Transport

## 🎯 Features You Can Test

✅ Register and Login
✅ Add income and expense transactions
✅ Edit any transaction
✅ Delete transactions
✅ See total balance update in real-time
✅ View monthly summary

## ❓ Having Issues?

1. **MongoDB not connecting?**
   - Run: `brew services list` (macOS) to check if MongoDB is running
   - Or: `mongosh` to test connection

2. **Port 5000 already in use?**
   - Change PORT in `backend/.env` file

3. **Frontend can't connect to backend?**
   - Make sure backend is running on port 5000
   - Check console for errors

## 📖 Full Documentation

See the main [README.md](README.md) for complete details, API documentation, and customization options.
