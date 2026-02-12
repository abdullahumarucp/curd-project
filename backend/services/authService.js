const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const register = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
  return {
    message: 'User registered successfully',
    user: { id: newUser._id, email: newUser.email },
    accessToken: token,
    refreshToken: token
  };
};

const login = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return {
    message: 'Login successful',
    user: { id: user._id, email: user.email },
    accessToken: token,
    refreshToken: token
  };
};

module.exports = { register, login };
