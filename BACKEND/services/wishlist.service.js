const User = require("../models/User.model");

const addToWishlist = async (userId, yachtId) => {
  const user = await User.findById(userId);
  if (!user.wishlist.includes(yachtId)) {
    user.wishlist.push(yachtId);
    await user.save();
  }
  return user.wishlist;
};

const removeFromWishlist = async (userId, yachtId) => {
  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== yachtId);
  await user.save();
  return user.wishlist;
};

const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate("wishlist");
  return user.wishlist;
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
