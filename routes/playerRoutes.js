const express = require('express');
const {getPlayerStats} = require("./../controller/playerController");
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.get("/:id/stats",authenticateToken, getPlayerStats);
 // here id is the player id


module.exports=router;