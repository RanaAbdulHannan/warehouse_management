const db = require('../config/database');

class TransactionService {
    async getAllTransactions() {
        const result = await db.query(`
            SELECT 
                t.transaction_id,
                t.transaction_type,
                t.total_price,
                t.transaction_date,
                td.transaction_detail_id,
                td.product_id,
                p.name as product_name,
                td.quantity,
                si.supplier_id,
                s.name as supplier_name,
                so.receiver_id,
                r.name as receiver_name
            FROM Transactions t
            LEFT JOIN TransactionDetails td ON t.transaction_id = td.transaction_id
            LEFT JOIN Products p ON td.product_id = p.product_id
            LEFT JOIN StockInward si ON t.transaction_id = si.transaction_id
            LEFT JOIN Suppliers s ON si.supplier_id = s.supplier_id
            LEFT JOIN StockOutward so ON t.transaction_id = so.transaction_id
            LEFT JOIN Receivers r ON so.receiver_id = r.receiver_id
            ORDER BY t.transaction_date DESC
        `);
        return result.rows;
    }

    async getRecentTransactions(limit = 10) {
        const result = await db.query(`
            SELECT 
                t.transaction_id,
                t.transaction_type,
                t.total_price,
                t.transaction_date,
                td.transaction_detail_id,
                td.product_id,
                p.name as product_name,
                td.quantity,
                si.supplier_id,
                s.name as supplier_name,
                so.receiver_id,
                r.name as receiver_name
            FROM Transactions t
            LEFT JOIN TransactionDetails td ON t.transaction_id = td.transaction_id
            LEFT JOIN Products p ON td.product_id = p.product_id
            LEFT JOIN StockInward si ON t.transaction_id = si.transaction_id
            LEFT JOIN Suppliers s ON si.supplier_id = s.supplier_id
            LEFT JOIN StockOutward so ON t.transaction_id = so.transaction_id
            LEFT JOIN Receivers r ON so.receiver_id = r.receiver_id
            ORDER BY t.transaction_date DESC
            LIMIT $1
        `, [limit]);
        return result.rows;
    }

    async createStockIn({ supplier_id, items, total_price }) {
        // items: [{ product_id, quantity }]
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            // Insert into Transactions
            const transactionResult = await client.query(
                'INSERT INTO Transactions (transaction_type, total_price) VALUES ($1, $2) RETURNING transaction_id',
                ['inward', total_price]
            );
            const transaction_id = transactionResult.rows[0].transaction_id;
            // Insert into TransactionDetails and update Products current_stock
            for (const item of items) {
                await client.query(
                    'INSERT INTO TransactionDetails (transaction_id, product_id, quantity) VALUES ($1, $2, $3)',
                    [transaction_id, item.product_id, item.quantity]
                );
                
                // Update current_stock in Products
                await client.query(
                    'UPDATE Products SET current_stock = current_stock + $1 WHERE product_id = $2',
                    [item.quantity, item.product_id]
                );
            }
            // Insert into StockInward
            await client.query(
                'INSERT INTO StockInward (transaction_id, supplier_id) VALUES ($1, $2)',
                [transaction_id, supplier_id]
            );
            await client.query('COMMIT');
            return { transaction_id };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async createStockOut({ receiver_id, items, total_price }) {
        // items: [{ product_id, quantity }]
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            
            // Check stock availability for all items
            for (const item of items) {
                const stockCheck = await client.query(
                    'SELECT current_stock FROM Products WHERE product_id = $1',
                    [item.product_id]
                );
                
                if (!stockCheck.rows[0] || stockCheck.rows[0].current_stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ID ${item.product_id}`);
                }
            }

            // Insert into Transactions
            const transactionResult = await client.query(
                'INSERT INTO Transactions (transaction_type, total_price) VALUES ($1, $2) RETURNING transaction_id',
                ['outward', total_price]
            );
            const transaction_id = transactionResult.rows[0].transaction_id;
            // Insert into TransactionDetails and update Products current_stock
            for (const item of items) {
                await client.query(
                    'INSERT INTO TransactionDetails (transaction_id, product_id, quantity) VALUES ($1, $2, $3)',
                    [transaction_id, item.product_id, item.quantity]
                );
                
                // Update current_stock in Products
                await client.query(
                    'UPDATE Products SET current_stock = current_stock - $1 WHERE product_id = $2',
                    [item.quantity, item.product_id]
                );
            }
            // Insert into StockOutward
            await client.query(
                'INSERT INTO StockOutward (transaction_id, receiver_id) VALUES ($1, $2)',
                [transaction_id, receiver_id]
            );
            await client.query('COMMIT');
            return { transaction_id };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = new TransactionService();