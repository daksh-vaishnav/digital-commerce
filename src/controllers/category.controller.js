import {
    createCategoryService,
    deleteCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService
} from '../services/category.service.js';

// Create new category
export const createCategory = async (req, res) => {
    try {
        const category = await createCategoryService(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await getCategoryByIdService(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const category = await updateCategoryService(req.params.id, req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        await deleteCategoryService(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};