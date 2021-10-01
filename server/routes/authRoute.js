const express = require('express');
const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/authMiddleware');

// controllers
const { createOrUpdateUser } = require('../controllers/authController');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;
