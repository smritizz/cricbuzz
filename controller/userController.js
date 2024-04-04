const User = require("./../model/userModel");
const jwt = require('jsonwebtoken');
const signToken = (id) => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signToken(newUser._id);

    res.status(200).json({
        status:"admin account successfully created",
      status_code: "200",
      user_id:newUser._id,
    //   token,
     
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({
        status: "fail",
        message: "Email address is already in use.",
      });
    }
    // For other errors, log and send a generic error response
    console.error(err,"here");
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        message: "please provide username and password",
      });
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code:"401"
      });
    }

    const token = signToken(user.__id);
    res.status(200).json({
      status: "Login Successful",
      status_code:"200",
      user_id:user._id,
      access_token:token
    });
  } catch (err) {
    console.log(err);
  }
};
