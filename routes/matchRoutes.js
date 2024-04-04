const express = require('express');
const {createMatch, getAllMatches, getMatchDetailsById} = require("./../controller/matchController");
const { authenticateToken } = require('../middleware/auth');


const router = express.Router();
router.get("/", getAllMatches);
router.post("/",authenticateToken, createMatch);
router.get("/:id", getMatchDetailsById); //here id the match_id



module.exports=router;