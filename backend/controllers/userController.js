const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._index || user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token, user: {"message":"login successfull", id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// Logout User
const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully. Clear token from frontend.' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { registerUser, loginUser, logoutUser };

