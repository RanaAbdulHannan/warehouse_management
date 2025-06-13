const transactionService = require('../services/transactionService');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecentTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getRecentTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStockIn = async (req, res) => {
    try {
        const transaction = await transactionService.createStockIn(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStockOut = async (req, res) => {
    try {
        const transaction = await transactionService.createStockOut(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};