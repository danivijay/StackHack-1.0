const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route   POST api/v1/auth/register
// @desc    Register new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw Error("Invalid Name/Email/Password");
    }
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      throw Error("User already exist");
    }
    let newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (salt_err, salt) => {
      if (salt_err) throw new Error("Error in password");
      bcrypt.hash(password.toString(), salt, async (hash_err, hash) => {
        if (hash_err || !hash) throw new Error("Error in password");
        newUser.password = hash;

        const user = await newUser.save();

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "2 days" },
          (token_err, token) => {
            if (token_err || !token) throw new Error("Error authenticating");
            res.status(200).json({
              success: true,
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  } catch (error) {
    console.log(`Registration failed: ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Registration failed", error.message],
    });
  }
};

// @route   POST api/v1/auth/login
// @desc    Login existing user
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw Error("Invalid email or password");
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" },
      async (token_err, token) => {
        if (token_err) throw new Error("Error generating token");
        res.status(200).json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.log(`Login failed: ${error.message}`.red);
    res.status(500).json({
      success: false,
      errors: ["Login failed", error.message],
    });
  }
};
