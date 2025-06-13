const express = require('express');
const router = express.Router();
const receiverService = require('../services/receiverService');

// Get all receivers
router.get('/', async (req, res) => {
    try {
        const receivers = await receiverService.getAllReceivers();
        res.json(receivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single receiver
router.get('/:id', async (req, res) => {
    try {
        const receiver = await receiverService.getReceiverById(req.params.id);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }
        res.json(receiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new receiver
router.post('/', async (req, res) => {
    try {
        const newReceiver = await receiverService.createReceiver(req.body);
        res.status(201).json(newReceiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a receiver
router.put('/:id', async (req, res) => {
    try {
        const updatedReceiver = await receiverService.updateReceiver(req.params.id, req.body);
        if (!updatedReceiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }
        res.json(updatedReceiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a receiver
router.delete('/:id', async (req, res) => {
    try {
        await receiverService.deleteReceiver(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get receiver's transaction history
router.get('/:id/transactions', async (req, res) => {
    try {
        const transactions = await receiverService.getReceiverTransactions(req.params.id);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;