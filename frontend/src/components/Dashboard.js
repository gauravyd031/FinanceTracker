import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionAPI } from '../services/api';
import TransactionForm from './TransactionForm';
import './Dashboard.css';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, summaryRes] = await Promise.all([
        transactionAPI.getAll(),
        transactionAPI.getSummary()
      ]);
      setTransactions(transactionsRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction');
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingTransaction(null);
    fetchData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Finance Tracker</h1>
          <p>Welcome, {user.name}!</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>

      {summary && (
        <div className="summary-cards">
          <div className="summary-card balance">
            <h3>Total Balance</h3>
            <p className="amount">{formatCurrency(summary.totalBalance)}</p>
          </div>
          <div className="summary-card income">
            <h3>Total Income</h3>
            <p className="amount">{formatCurrency(summary.totalIncome)}</p>
          </div>
          <div className="summary-card expense">
            <h3>Total Expenses</h3>
            <p className="amount">{formatCurrency(summary.totalExpense)}</p>
          </div>
        </div>
      )}

      {summary?.currentMonth && (
        <div className="monthly-summary">
          <h2>This Month ({summary.currentMonth.month})</h2>
          <div className="monthly-stats">
            <div className="stat">
              <span className="label">Income:</span>
              <span className="value income">{formatCurrency(summary.currentMonth.income)}</span>
            </div>
            <div className="stat">
              <span className="label">Expenses:</span>
              <span className="value expense">{formatCurrency(summary.currentMonth.expense)}</span>
            </div>
            <div className="stat">
              <span className="label">Balance:</span>
              <span className="value">{formatCurrency(summary.currentMonth.balance)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="transactions-section">
        <div className="section-header">
          <h2>Transactions</h2>
          <button onClick={handleAddTransaction} className="btn btn-primary">
            + Add Transaction
          </button>
        </div>

        {showForm && (
          <TransactionForm
            transaction={editingTransaction}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Add your first transaction to get started!</p>
          </div>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                <div className="transaction-main">
                  <div className="transaction-info">
                    <h4>{transaction.category}</h4>
                    <p className="transaction-note">{transaction.note}</p>
                    <p className="transaction-date">{formatDate(transaction.date)}</p>
                  </div>
                  <div className="transaction-amount">
                    <span className={transaction.type}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>
                <div className="transaction-actions">
                  <button 
                    onClick={() => handleEditTransaction(transaction)}
                    className="btn-icon"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTransaction(transaction._id)}
                    className="btn-icon delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
