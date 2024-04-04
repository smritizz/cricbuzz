const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team_1: {
    type: String,
    required: [true, "please enter team 1 name"],
  },
  team_2: {
    type: String,
    required: [true, "please enter team 2 name"],
  },
  date: {
    type: Date,
  },
  venue: String,
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },

  squads: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
      players: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
        },
      ],
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
