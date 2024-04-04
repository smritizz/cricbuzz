const express = require('express');
const {login,signup} = require("./../controller/userController");
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);


module.exports=router;