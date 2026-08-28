import { Router } from 'express';

const router = Router();

import { getFoods, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foodController.js';

import { admin } from '../middleware/admin.js';
import { protect } from '../middleware/auth.js';

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', protect, admin, createFood);
router.put('/:id', protect, admin, updateFood);
router.delete('/:id', protect, admin, deleteFood);

export default router;
