import Order from '../models/Order.js';
import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';

const VALID_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'out-for-delivery',
  'delivered',
  'cancelled',
];

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private/Customer
const createOrder = async (req, res, next) => {
  try {
    const { restaurant, items, deliveryAddress } = req.body;

    if (!restaurant || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Restaurant and at least one item are required' });
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const restaurantExists = await Restaurant.findById(restaurant);
    if (!restaurantExists) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Re-validate items and prices server-side using the DB, never trust client-sent prices
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food item not found: ${item.food}` });
      }
      if (!food.available) {
        return res.status(400).json({ message: `Food item is unavailable: ${food.name}` });
      }

      const quantity = Number(item.quantity) || 1;
      if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
      }

      totalPrice += food.price * quantity;

      orderItems.push({
        food: food._id,
        name: food.name,
        price: food.price,
        quantity,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      restaurant,
      items: orderItems,
      totalPrice,
      deliveryAddress,
      status: 'pending',
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders - customers see their own, admins see all
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };

    const orders = await Order.find(filter)
      .populate('restaurant', 'name image')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by id
// @route   GET /api/orders/:id
// @access  Private (owner or admin)
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name image address')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updated = await order.save();

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export { createOrder, getOrders, getOrderById, updateOrderStatus };
