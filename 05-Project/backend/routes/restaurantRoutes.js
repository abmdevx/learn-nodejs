import { Router } from 'express';

const router = Router();

import { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';

import { admin } from '../middleware/admin.js';
import { protect } from '../middleware/auth.js';

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, admin, createRestaurant);
router.put('/:id', protect, admin, updateRestaurant);
router.delete('/:id', protect, admin, deleteRestaurant);

export default router;
