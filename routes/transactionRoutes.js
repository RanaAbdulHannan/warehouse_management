const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Get recent transactions
router.get('/recent', transactionController.getRecentTransactions);

// Create stock-in transaction
router.post('/stock-in', transactionController.createStockIn);

// Create stock-out transaction
router.post('/stock-out', transactionController.createStockOut);

module.exports = router;