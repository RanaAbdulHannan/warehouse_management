const db = require('../config/database');

class InventoryService {
    async getAllItems() {
        const result = await db.query('SELECT * FROM Products ORDER BY name');
        return result.rows;
    }

    async getItemById(id) {
        const result = await db.query('SELECT * FROM Products WHERE product_id = $1', [id]);
        return result.rows[0];
    }

    async createItem(item) {
        const { name, price, type } = item;
        const result = await db.query(
            'INSERT INTO Products (name, price, type) VALUES ($1, $2, $3) RETURNING *',
            [name, price, type]
        );
        return result.rows[0];
    }

    async updateItem(id, item) {
        const { name, price, type } = item;
        const result = await db.query(
            'UPDATE Products SET name = $1, price = $2, type = $3 WHERE product_id = $4 RETURNING *',
            [name, price, type, id]
        );
        return result.rows[0];
    }

    async deleteItem(id) {
        await db.query('DELETE FROM Products WHERE product_id = $1', [id]);
    }
}

module.exports = new InventoryService();