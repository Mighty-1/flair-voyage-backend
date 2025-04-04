const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlist.controller");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/wishlists/add-item", protect, addToWishlist);
router.post("/wishlists/remove-item", protect, removeFromWishlist);
router.get("/wishlists", protect, getWishlist);

module.exports = router;
