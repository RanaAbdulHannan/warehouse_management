const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Get all dashboard data
router.get('/', async (req, res) => {
    try {
        const dashboardData = await dashboardController.getDashboardData();
        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get low stock items for dashboard
router.get('/low-stock', async (req, res) => {
    try {
        const items = await dashboardController.getLowStockItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recent transactions for dashboard
router.get('/recent-transactions', async (req, res) => {
    try {
        const transactions = await dashboardController.getRecentTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get inventory summary by category
router.get('/inventory-summary', async (req, res) => {
    try {
        const summary = await dashboardController.getInventorySummary();
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get statistics for dashboard
router.get('/statistics', async (req, res) => {
    try {
        const stats = await dashboardController.getStatistics();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;