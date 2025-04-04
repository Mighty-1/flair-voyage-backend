const express = require('express');
const {newUser, loginUser} = require('../controllers/User.controller');

const router = express.Router();

router.post('/register', newUser);
router.post('/login', loginUser);

module.exports = router;