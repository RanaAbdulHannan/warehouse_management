const express = require('express');
const router = express.Router();
const supplierService = require('../services/supplierService');

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single supplier
router.get('/:id', async (req, res) => {
    try {
        const supplier = await supplierService.getSupplierById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const newSupplier = await supplierService.createSupplier(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a supplier
router.put('/:id', async (req, res) => {
    try {
        const updatedSupplier = await supplierService.updateSupplier(req.params.id, req.body);
        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
    try {
        await supplierService.deleteSupplier(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get supplier's transaction history
router.get('/:id/transactions', async (req, res) => {
    try {
        const transactions = await supplierService.getSupplierTransactions(req.params.id);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;