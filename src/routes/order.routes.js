import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  // getOrderInvoices
} from '../controllers/order.controller.js';
import { validateCreate } from '../validators/order.validator.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Order routes
router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.post('/', validateCreate, createOrder);
router.put('/:orderId', validateCreate, updateOrder);

// Invoice routes
// router.get('/:orderId/invoices', getOrderInvoices);

export default router; 