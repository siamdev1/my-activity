const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateJWT = require('../middleware/auth.middleware');

// Public Health Check Endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'Node.js Express Backend Service',
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Protected Profile & Activity Routes
router.get('/users/profile', authenticateJWT, userController.getProfile);
router.get('/activity/summary', authenticateJWT, userController.getActivitySummary);

// Public overview endpoint for demo UI
router.get('/public/overview', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      owner: "siamdev1",
      repo: "my-activity",
      commitCount: 2540,
      stacks: ["Node.js", "React", "Python", "WordPress"],
      status: "operational"
    }
  });
});

module.exports = router;
