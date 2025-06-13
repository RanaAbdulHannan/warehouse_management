const db = require('../config/database');

class ReceiverService {
    async getAllReceivers() {
        const result = await db.query('SELECT * FROM Receivers ORDER BY name');
        return result.rows;
    }

    async getReceiverById(id) {
        const result = await db.query('SELECT * FROM Receivers WHERE receiver_id = $1', [id]);
        return result.rows[0];
    }

    async createReceiver(receiver) {
        const { name, contact_number, address } = receiver;
        const result = await db.query(
            'INSERT INTO Receivers (name, contact_number, address) VALUES ($1, $2, $3) RETURNING *',
            [name, contact_number, address]
        );
        return result.rows[0];
    }

    async updateReceiver(id, receiver) {
        const { name, contact_number, address } = receiver;
        const result = await db.query(
            'UPDATE Receivers SET name = $1, contact_number = $2, address = $3 WHERE receiver_id = $4 RETURNING *',
            [name, contact_number, address, id]
        );
        return result.rows[0];
    }

    async deleteReceiver(id) {
        await db.query('DELETE FROM Receivers WHERE receiver_id = $1', [id]);
    }
}

module.exports = new ReceiverService();