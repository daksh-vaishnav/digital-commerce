import { orderSchema } from '../validators/order.validator.js';
import { getAllOrdersService, getOrderByIdService, createOrderService, updateOrderService } from '../services/order.service.js';



// Get all orders with pagination and filtering
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const { orders, total } = await getAllOrdersService(where, skip, limit);

    res.json({
      orders,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderByIdService(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body, req.body.items);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await updateOrderService(orderId, req.body);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
