require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');
const Order = require('../models/Order');

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Order.deleteMany();
    await Food.deleteMany();
    await Restaurant.deleteMany();
    await User.deleteMany();

    console.log('Creating users...');
    const salt = await bcrypt.genSalt(10);

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@fooddelivery.com',
      password: await bcrypt.hash('admin123', salt),
      role: 'admin',
      address: '123 Admin Street, Metropolis',
    });

    const customerUser = await User.create({
      name: 'John Customer',
      email: 'john@example.com',
      password: await bcrypt.hash('customer123', salt),
      role: 'customer',
      address: '456 Customer Ave, Metropolis',
    });

    console.log('Creating restaurants...');
    const restaurants = await Restaurant.insertMany([
      {
        name: 'Pizza Palace',
        description: 'Authentic Italian wood-fired pizzas made fresh daily.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
        cuisine: 'Italian',
        address: '12 Little Italy Rd, Metropolis',
        rating: 4.5,
      },
      {
        name: 'Sushi Central',
        description: 'Fresh sushi and Japanese favorites made by expert chefs.',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
        cuisine: 'Japanese',
        address: '88 Sakura Lane, Metropolis',
        rating: 4.8,
      },
      {
        name: 'Burger Hub',
        description: 'Juicy handmade burgers and crispy fries.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
        cuisine: 'American',
        address: '5 Grill Street, Metropolis',
        rating: 4.2,
      },
      {
        name: 'Spice Route',
        description: 'Traditional Indian curries and tandoori specialties.',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
        cuisine: 'Indian',
        address: '77 Curry Blvd, Metropolis',
        rating: 4.6,
      },
    ]);

    const [pizzaPalace, sushiCentral, burgerHub, spiceRoute] = restaurants;

    console.log('Creating food items...');
    const foods = await Food.insertMany([
      // Pizza Palace
      {
        restaurant: pizzaPalace._id,
        name: 'Margherita Pizza',
        description: 'Classic tomato, mozzarella and fresh basil.',
        price: 9.99,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
        available: true,
      },
      {
        restaurant: pizzaPalace._id,
        name: 'Pepperoni Pizza',
        description: 'Loaded with spicy pepperoni and mozzarella.',
        price: 11.99,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600',
        available: true,
      },
      {
        restaurant: pizzaPalace._id,
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter and herbs.',
        price: 4.5,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa10f38?w=600',
        available: true,
      },
      // Sushi Central
      {
        restaurant: sushiCentral._id,
        name: 'California Roll',
        description: 'Crab, avocado and cucumber roll.',
        price: 8.5,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600',
        available: true,
      },
      {
        restaurant: sushiCentral._id,
        name: 'Salmon Nigiri (6pcs)',
        description: 'Fresh salmon over seasoned rice.',
        price: 12.0,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=600',
        available: true,
      },
      {
        restaurant: sushiCentral._id,
        name: 'Miso Soup',
        description: 'Traditional soybean paste soup with tofu.',
        price: 3.5,
        category: 'Soup',
        image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=600',
        available: true,
      },
      // Burger Hub
      {
        restaurant: burgerHub._id,
        name: 'Classic Cheeseburger',
        description: 'Beef patty, cheddar, lettuce, tomato and special sauce.',
        price: 8.99,
        category: 'Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
        available: true,
      },
      {
        restaurant: burgerHub._id,
        name: 'Crispy Fries',
        description: 'Golden crispy fries with sea salt.',
        price: 3.99,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
        available: true,
      },
      {
        restaurant: burgerHub._id,
        name: 'Chocolate Milkshake',
        description: 'Thick and creamy chocolate milkshake.',
        price: 4.99,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600',
        available: true,
      },
      // Spice Route
      {
        restaurant: spiceRoute._id,
        name: 'Butter Chicken',
        description: 'Creamy tomato curry with tender chicken.',
        price: 10.99,
        category: 'Curry',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600',
        available: true,
      },
      {
        restaurant: spiceRoute._id,
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice with mixed vegetables and spices.',
        price: 9.5,
        category: 'Rice',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
        available: true,
      },
      {
        restaurant: spiceRoute._id,
        name: 'Garlic Naan',
        description: 'Soft flatbread topped with garlic and butter.',
        price: 2.99,
        category: 'Bread',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600',
        available: true,
      },
    ]);

    console.log('Creating a sample order...');
    const sampleItems = [
      {
        food: foods[0]._id,
        name: foods[0].name,
        price: foods[0].price,
        quantity: 2,
      },
      {
        food: foods[2]._id,
        name: foods[2].name,
        price: foods[2].price,
        quantity: 1,
      },
    ];
    const sampleTotal = sampleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await Order.create({
      user: customerUser._id,
      restaurant: pizzaPalace._id,
      items: sampleItems,
      totalPrice: sampleTotal,
      deliveryAddress: customerUser.address,
      status: 'delivered',
    });

    console.log('\nSeed data created successfully!');
    console.log('----------------------------------');
    console.log('Admin login:    admin@fooddelivery.com / admin123');
    console.log('Customer login: john@example.com / customer123');
    console.log('----------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
