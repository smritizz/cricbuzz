const Player = require("../model/playerModel");
const Team = require("../model/teamModel");


// Controller function to add a player to the team's 
exports.addPlayerToTeam = async (req, res) => {
    try {
      const teamId = req.params.id;
      const { name, role } = req.body;
  
      // Find the team by ID
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      const newPlayer = await Player.create({ name, role, teamId: team._id });
  
      team.squad.push(newPlayer);
      await team.save();
  
      res.status(201).json({ message: 'Player added to squad successfully', player_id: newPlayer._id });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  