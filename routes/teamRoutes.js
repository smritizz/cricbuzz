const express = require('express');
const {addPlayerToTeam} = require("./../controller/teamController");
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.post("/:id/squad", authenticateToken,addPlayerToTeam); // here id is the team id


module.exports=router;