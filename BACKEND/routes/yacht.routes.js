const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middlewares/authMiddleware");
const yachtController = require("../controllers/yacht.controller");

// Multer setup for handling multipart form-data
const storage = multer.diskStorage({});
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

// Routes
router.get("/fetch-agent-yachts", protect, yachtController.getYachtsByOwner);
router.get("/fetch-yacht-by-id/:id", yachtController.getYachtById);
router.post(
  "/create-a-yacht",
  upload.array("images", 5),
  protect,
  yachtController.createYacht
);
// router.post("/create-a-yacht", upload.fields([{ name: "images", maxCount: 5}]), async (req, res) => {
//     console.log("Request received:", req.body); // Log request data
//     console.log("Files received:", req.files); // Log uploaded files
//   }, protect, yachtController.createYacht);
router.put("/update-a-yacht/:id", protect, yachtController.updateYacht);
router.delete("/delete-a-yacht/:id", protect, yachtController.deleteYacht);
router.get("/search", protect, yachtController.searchYachts);

module.exports = router;
