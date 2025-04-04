const { signUp, signIn } = require("../services/User.service");

// Register a new user
const newUser = async (req, res) => {
  try {
    const { name, email, password, isAgent } = req.body;

    const { token, user } = await signUp(name, email, password, isAgent);

    res.status(201).json({ msg: `User Created`, token: token, data: user });
  } catch (err) {
    res.status(400).json({ msg: err.message || "Failed to create user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userWithoutSentitiveData } = await signIn(email, password);
    res.status(200).json({ msg: "Login successful", user: userWithoutSentitiveData, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { newUser, loginUser };
