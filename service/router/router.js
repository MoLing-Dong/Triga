const express = require('express');
const router = express.Router();

const {
  userLogin
} = require('../api/userLogin');

const {
  userRegister
} = require('../api/userRegister');

router.post('/login', userLogin);
router.post('/register', userRegister);

module.exports = router;
