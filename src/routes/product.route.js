import express from 'express';
import { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImages,
  getProductFeatures
} from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all products with pagination and filtering
router.get('/', authenticate, getAllProducts);

// Get product by ID
router.get('/:productId', authenticate, getProductById);

// Create new product
router.post('/', authenticate, createProduct);

// Update product
router.put('/:productId', authenticate, updateProduct);

// Delete product
router.delete('/:productId', authenticate, deleteProduct);

// Get product images
router.get('/:productId/images', authenticate, getProductImages);

// Get product features
router.get('/:productId/features', authenticate, getProductFeatures);

export default router;