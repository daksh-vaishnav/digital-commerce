import { productService } from '../services/product.service';
import { productValidator } from '../validators/product.validator';

// Create a new product
const createProduct = async (req, res) => {
    try {
        const validatedData = productValidator.validateCreateProduct(req.body);
        const product = await productService.createProduct(validatedData);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const { page, limit, categoryId, collectionId, shopId } = req.query;
        const result = await productService.getAllProducts({
            page,
            limit,
            categoryId,
            collectionId,
            shopId
        });

        res.status(200).json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = productValidator.validateUpdateProduct(req.body);
        const product = await productService.updateProduct(id, validatedData);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// Delete product (soft delete)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.deleteProduct(id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
