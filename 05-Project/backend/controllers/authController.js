import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import googleClient from '../utils/googleAuth.js';

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

    if (!credential) {
      return res.status(400).json({
        message: 'Google credential is required',
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub,
      email,
      name
    } = payload;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        token: generateToken(user._id),
      });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      googleId: sub,
      role: 'customer',
    });

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      address: newUser.address,
      token: generateToken(newUser._id),
    });

  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getMe, googleLogin };
