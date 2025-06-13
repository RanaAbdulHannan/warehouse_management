const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get all products
router.get('/', inventoryController.getAllProducts);

// Get a single product
router.get('/:id', inventoryController.getProductById);

// Create a product
router.post('/', inventoryController.createProduct);

// Update a product
router.put('/:id', inventoryController.updateProduct);

// Delete a product
router.delete('/:id', inventoryController.deleteProduct);

module.exports = router;