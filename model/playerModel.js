const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: 
  { 
    type: String,
     required: [true,"Please enter the Name"],
  },
  role: 
  { 
    type: String,
     required: [true,"Please enter the Role of Player"],
  },
  teamId: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  matches_played:{
    type:Number,
    default:50
  },
  strike_rate:{
    type:Number,
    default:90.0
  },
  runs:{
    type:Number,
    default:100
  },
  average:{
    type:Number,
    default:54.2
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
