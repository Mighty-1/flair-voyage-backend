const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const genToken = require("../utils/generateToken");

// Register user
const signUp = async (name, email, password, isAgent) => {
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await userModel.create({ name, email, password, isAgent });
    const token = genToken(user._id);

    // console.log("User created successfull:", token, user);
    return { token, user };
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw err;
  }
};

// Login user
const signIn = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  const token = genToken(user._id);
  const {_id: id,
    name,
    isAgent
  } = user;
  const userWithoutSentitiveData = {
    id,
    name,
    email,
    isAgent
  }
  return { token, userWithoutSentitiveData };
};

module.exports = { signUp, signIn };
