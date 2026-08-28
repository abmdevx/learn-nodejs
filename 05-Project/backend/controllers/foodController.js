import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';
// @desc    Get all foods (optionally filtered by restaurant or category)
// @route   GET /api/foods?restaurant=&category=
// @access  Public
const getFoods = async (req, res, next) => {
  try {
    const { restaurant, category } = req.query;
    const filter = {};

    if (restaurant) {
      filter.restaurant = restaurant;
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    const foods = await Food.find(filter).populate('restaurant', 'name cuisine').sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single food by id
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant', 'name cuisine');
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

// @desc    Create food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res, next) => {
  try {
    const { restaurant, name, description, price, category, image, available } = req.body;

    if (!restaurant || !name || price === undefined) {
      return res.status(400).json({ message: 'Restaurant, name and price are required' });
    }

    const restaurantExists = await Restaurant.findById(restaurant);
    if (!restaurantExists) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const food = await Food.create({
      restaurant,
      name,
      description,
      price,
      category,
      image,
      available,
    });

    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
};

// @desc    Update food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const allowedFields = [
      'name',
      'description',
      'price',
      'category',
      'image',
      'available',
      'restaurant',
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        food[field] = req.body[field];
      }
    }

    const updated = await food.save();

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    await food.deleteOne();
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export { getFoods, getFoodById, createFood, updateFood, deleteFood };
