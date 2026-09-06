import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Only allow 'admin' role to be set intentionally (e.g. via seed script/manual DB edit).
    // For public registration, we default to 'customer' unless explicitly requested here
    // for learning-project simplicity.
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address: address || '',
      role: role === 'admin' ? 'admin' : 'customer',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    // req.user is attached by the `protect` middleware and already excludes password
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {

    const { credential } = req.body;

    // 1. Verify Google token

    // 2. Get Google user information

    // 3. Check MongoDB user

    // 4. Create user if doesn't exist

    // 5. Generate your JWT

    // 6. Return user + token

  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe, googleLogin };
