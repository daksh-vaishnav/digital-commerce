import { Router } from 'express';
const router = Router();
import { validateCreate, validateUpdate } from '../validators/collection.validator.js';

import {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
} from '../controllers/collection.controller.js';

// Get all categories
router.get('/', getAllCollections);

// Get single collection by ID
router.get('/:id', getCollectionById);

// Create new collection
router.post('/', validateCreate, createCollection);

// Update collection
router.put('/:id', validateUpdate, updateCollection);

// Delete collection
router.delete('/:id', deleteCollection);

export default router;
