import { Router } from 'express';
const router = Router();

import { validateCreate, validateUpdate } from '../validators/inventory.validator.js';

import {
    getAllInventory,
    getInventory,
    getInventoryByProduct,
    createNewInventory,
    updateInventoryDetails,
    deleteInventoryDetails,
    updateInventoryStock
} from '../controllers/inventory.controller.js';

// Get all inventory details
router.get('/', getAllInventory);

// Get inventory by ID
router.get('/:id', getInventory);

// Get inventory by product ID
router.get('/product/:productId', getInventoryByProduct);

// Create new inventory
router.post('/', validateCreate, createNewInventory);

// Update inventory
router.put('/:id', validateUpdate, updateInventoryDetails);

// Delete inventory
router.delete('/:id', deleteInventoryDetails);

// Update stock quantity
router.patch('/stock/:productId', validateUpdate, updateInventoryStock);

export default router; 