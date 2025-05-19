import express from 'express';
import authRoutes from './auth.routes.js';
import orderRoutes from './order.routes.js';
import categoryRoutes from './category.routes.js';
// import productRoutes from './product.routes.js';
// import warehouseRoutes from './warehouse.routes.js';
// import shipmentRoutes from './shipment.routes.js';
// import campaignRoutes from './campaign.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
// router.use('/products', productRoutes);
// router.use('/warehouses', warehouseRoutes);
// router.use('/shipments', shipmentRoutes);
// router.use('/campaigns', campaignRoutes);

export default router;
