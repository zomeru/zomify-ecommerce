const express = require('express');

const router = express.Router();

// import controllers
const { createOrUpdateUser } = require('../controllers/authController');

router.get('/create-or-update-user', createOrUpdateUser);

module.exports = router;
