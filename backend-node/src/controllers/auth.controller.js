const { generateToken } = require('../utils/token');

// Mock in-memory user repository for demo architecture
const users = [
  {
    id: 'usr_001',
    name: 'Siam Developer',
    email: 'siam@example.com',
    password: 'password123',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z'
  }
];

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required fields.'
      });
    }

    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists.'
      });
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      role: 'developer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register
};
