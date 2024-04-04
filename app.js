const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json());

const db = process.env.DATABASE_LOCAL;
mongoose
  .connect(db, {
    // newUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  });

const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");





app.use("/api/admin", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
