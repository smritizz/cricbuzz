const Team = require("./../model/teamModel");
const Player = require("../model/playerModel");

// Controller function to add a player to the team's squad
exports.getPlayerStats = async (req,res) => {
  const playerId=req.params.id;
  const player=await Player.findById(playerId);
  if(!player){
    return res.status(404).json({ message: 'Player not found' });
  }
  console.log(player);
  res.status(201).json({

    player_id:player._id,
    name:player.name,
    matches_played:player.matches_played,
    average:player.average,
    strike_rate:player.strike_rate,
    runs:player.runs,

  });

}