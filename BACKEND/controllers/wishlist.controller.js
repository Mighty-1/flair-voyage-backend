const wishlistService = require("../services/wishlist.service");

const addToWishlist = async (req, res) => {
  try {
    const { yachtId } = req.body;
    const userId = req.user.id;
    const wishlist = await wishlistService.addToWishlist(userId, yachtId);
    res.status(200).json({ message: "Added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { yachtId } = req.body;
    const userId = req.user.id;
    const wishlist = await wishlistService.removeFromWishlist(userId, yachtId);
    res.status(200).json({ message: "Removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await wishlistService.getWishlist(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
