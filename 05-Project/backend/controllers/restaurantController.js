import Restaurant from '../models/Restaurant.js';
import Food from '../models/Food.js';

// @desc    Get all restaurants (supports search & cuisine filter)
// @route   GET /api/restaurants?search=&cuisine=
// @access  Public
const getRestaurants = async (req, res, next) => {
  try {
    const { search, cuisine } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: 'i' };
    }

    const restaurants = await Restaurant.find(filter).sort({ createdAt: -1 });
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single restaurant by id
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

// @desc    Create restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = async (req, res, next) => {
  try {
    const { name, description, image, cuisine, address, rating } = req.body;

    if (!name || !cuisine || !address) {
      return res.status(400).json({ message: 'Name, cuisine and address are required' });
    }

    const restaurant = await Restaurant.create({
      name,
      description,
      image,
      cuisine,
      address,
      rating,
    });

    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, description, image, cuisine, address, rating } = req.body;

    if (name !== undefined) restaurant.name = name;
    if (description !== undefined) restaurant.description = description;
    if (image !== undefined) restaurant.image = image;
    if (cuisine !== undefined) restaurant.cuisine = cuisine;
    if (address !== undefined) restaurant.address = address;
    if (rating !== undefined) restaurant.rating = rating;

    const updated = await restaurant.save();
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete restaurant (and its food items)
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await Food.deleteMany({ restaurant: restaurant._id });
    await restaurant.deleteOne();

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export{
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
