const db = require('../config/database');

class SupplierService {
    async getAllSuppliers() {
        const result = await db.query('SELECT * FROM Suppliers ORDER BY name');
        return result.rows;
    }

    async getSupplierById(id) {
        const result = await db.query('SELECT * FROM Suppliers WHERE supplier_id = $1', [id]);
        return result.rows[0];
    }

    async createSupplier(supplier) {
        const { name, contact_number, shop_address, supplied_product_types } = supplier;
        const result = await db.query(
            'INSERT INTO Suppliers (name, contact_number, shop_address, supplied_product_types) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, contact_number, shop_address, supplied_product_types]
        );
        return result.rows[0];
    }

    async updateSupplier(id, supplier) {
        const { name, contact_number, shop_address, supplied_product_types } = supplier;
        const result = await db.query(
            'UPDATE Suppliers SET name = $1, contact_number = $2, shop_address = $3, supplied_product_types = $4 WHERE supplier_id = $5 RETURNING *',
            [name, contact_number, shop_address, supplied_product_types, id]
        );
        return result.rows[0];
    }

    async deleteSupplier(id) {
        await db.query('DELETE FROM Suppliers WHERE supplier_id = $1', [id]);
    }
}

module.exports = new SupplierService();