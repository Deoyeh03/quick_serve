const express = require('express');

const user = require('../controllers/user');

const router = express.Router();

// Register user
router.post('/register', user.registerUser);

// login user
router.post('/login', user.loginUser);




module.exports = router;