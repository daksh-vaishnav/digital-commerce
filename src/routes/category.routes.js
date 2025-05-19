import { Router } from 'express';
const router = Router();
import { validateCreate, validateUpdate } from '../validators/category.validator.js';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/category.controller.js';

// Get all categories
router.get('/', getAllCategories);

// Get single category by ID
router.get('/:id', getCategoryById);

// Create new category
router.post('/', validateCreate, createCategory);

// Update category
router.put('/:id', validateUpdate, updateCategory);

// Delete category
router.delete('/:id', deleteCategory);

export default router;
