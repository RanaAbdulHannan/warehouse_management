const receiverService = require('../services/receiverService');

exports.getAllReceivers = async (req, res) => {
    try {
        const receivers = await receiverService.getAllReceivers();
        res.json(receivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReceiverById = async (req, res) => {
    try {
        const receiver = await receiverService.getReceiverById(req.params.id);
        if (!receiver) return res.status(404).json({ error: 'Receiver not found' });
        res.json(receiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReceiver = async (req, res) => {
    try {
        const newReceiver = await receiverService.createReceiver(req.body);
        res.status(201).json(newReceiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReceiver = async (req, res) => {
    try {
        const updatedReceiver = await receiverService.updateReceiver(req.params.id, req.body);
        if (!updatedReceiver) return res.status(404).json({ error: 'Receiver not found' });
        res.json(updatedReceiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReceiver = async (req, res) => {
    try {
        const deleted = await receiverService.deleteReceiver(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Receiver not found' });
        res.json({ message: 'Receiver deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};