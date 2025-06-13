const inventoryService = require('../services/inventoryService');
const transactionService = require('../services/transactionService');
const supplierService = require('../services/supplierService');
const receiverService = require('../services/receiverService');
const db = require('../config/database');

const dashboardController = {
    // Get all dashboard data
    async getDashboardData() {
        try {
            const [
                products,
                recentTransactions,
                inventorySummary,
                statistics
            ] = await Promise.all([
                this.getProductStock(),
                this.getRecentTransactions(),
                this.getInventorySummary(),
                this.getStatistics()
            ]);

            return {
                products,
                recentTransactions,
                inventorySummary,
                statistics
            };
        } catch (error) {
            console.error('Dashboard data error:', error);
            throw new Error('Failed to fetch dashboard data');
        }
    },

    // Get product stock (current stock for each product)
    async getProductStock() {
        const result = await db.query(`
            SELECT 
                p.*,
                CASE WHEN p.current_stock <= 5 THEN true ELSE false END as is_low_stock
            FROM Products p
            ORDER BY p.current_stock ASC
        `);
        return result.rows;
    },

    // Get recent transactions
    async getRecentTransactions() {
        return await transactionService.getRecentTransactions();
    },

    // Get inventory summary by type
    async getInventorySummary() {
        const result = await db.query(`
            SELECT 
                p.type,
                COUNT(*) as count,
                SUM(p.price) as total_value
            FROM Products p
            GROUP BY p.type
        `);
        return result.rows;
    },

    // Get statistics
    async getStatistics() {
        const [products, suppliers, receivers, transactions] = await Promise.all([
            inventoryService.getAllItems(),
            supplierService.getAllSuppliers(),
            receiverService.getAllReceivers(),
            transactionService.getAllTransactions()
        ]);
        const totalProducts = products.length;
        const totalSuppliers = suppliers.length;
        const totalReceivers = receivers.length;
        // Monthly transactions (last 30 days)
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const monthlyTransactions = transactions.filter(t => new Date(t.transaction_date) >= thirtyDaysAgo).length;
        return {
            totalProducts,
            totalSuppliers,
            totalReceivers,
            monthlyTransactions
        };
    }
};

module.exports = dashboardController;