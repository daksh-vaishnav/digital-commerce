import {
    getAllInventoryDetails,
    getInventoryById,
    getInventoryByProductId,
    createInventory,
    updateInventory,
    deleteInventory,
    updateStock
} from '../services/inventory.service.js';

export const getAllInventory = async (req, res) => {
    try {
        const inventory = await getAllInventoryDetails();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInventory = async (req, res) => {
    try {
        const inventory = await getInventoryById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInventoryByProduct = async (req, res) => {
    try {
        const inventory = await getInventoryByProductId(req.params.productId);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found for this product' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewInventory = async (req, res) => {
    try {
        const inventory = await createInventory(req.body);
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInventoryDetails = async (req, res) => {
    try {
        const inventory = await updateInventory(req.params.id, req.body);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteInventoryDetails = async (req, res) => {
    try {
        await deleteInventory(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInventoryStock = async (req, res) => {
    try {
        const { quantity } = req.body;
        const inventory = await updateStock(req.params.productId, quantity);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found for this product' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
