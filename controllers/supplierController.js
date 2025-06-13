const supplierService = require('../services/supplierService');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await supplierService.getSupplierById(req.params.id);
        if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const newSupplier = await supplierService.createSupplier(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await supplierService.updateSupplier(req.params.id, req.body);
        if (!updatedSupplier) return res.status(404).json({ error: 'Supplier not found' });
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const deleted = await supplierService.deleteSupplier(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Supplier not found' });
        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};