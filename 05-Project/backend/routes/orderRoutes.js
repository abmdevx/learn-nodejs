import { Router } from 'express';

const router = Router();

import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';

import { admin } from '../middleware/admin.js';
import { protect } from '../middleware/auth.js';

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
