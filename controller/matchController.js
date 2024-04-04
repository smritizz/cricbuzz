const Match = require("../model/matchModel");
const Team = require("../model/teamModel");
const Player = require("../model/playerModel");

exports.createMatch = async (req, res) => {
  const { team_1, team_2, date, venue } = req.body;
  try {
    const newMatch = await Match.create({
      team_1,
      team_2,
      date,
      venue,
    });

    res.status(201).json({
      message: "Match created successfully",
      match_id: newMatch._id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().select("-__v -status -squads").lean();
    const Matches_ = matches.map((match) => {
      return { ...match, match_id: match._id, _id: undefined };
    });
    res.status(200).json({ matches: Matches_ });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMatchDetailsById = async (req, res) => {
  const match_id = req.params.id;
  
  try {
    const match = await Match.findById(match_id).select("-__v").lean();

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    const team1 = await Team.findOne({ name: match.team_1 });
    const Players1 = await Player.find({ teamId: team1._id }).select(
      "-role -teamId -__v -matches_played -runs -average -strike_rate"
    );
    const team2 = await Team.findOne({ name: match.team_2 });
    const Players2 = await Player.find({ teamId: team2._id }).select(
      "-role -teamId -__v -matches_played -runs -average -strike_rate"
    );
    const modifiedPlayers1 = Players1.map((player) => ({
      ...player.toObject(),
      playerId: player._id,
      _id: undefined,
    }));

    const modifiedPlayers2 = Players2.map((player) => ({
      ...player.toObject(),
      playerId: player._id,
      _id: undefined,
    }));

    const squads = [];

    const squadObj1 = { team_1: modifiedPlayers1 };
    const squadObj2 = { team_2: modifiedPlayers2 };
    squads.push(squadObj1, squadObj2);

    match.squads = squads;
    const Match_ = {
      ...match,
      match_id: match._id,
      _id: undefined,
    };
    res.status(200).json({ match: Match_ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};