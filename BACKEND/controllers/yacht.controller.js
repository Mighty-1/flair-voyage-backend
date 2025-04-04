const yachtService = require("../services/yacht.service");

// Get all yachts
const getYachts = async (req, res) => {
  try {
    const yachts = await yachtService.getAllYachts();
    res.status(200).json(yachts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a yacht by ID
const getYachtById = async (req, res) => {
  try {
    const yacht = await yachtService.getYachtById(req.params.id);
    res.status(200).json(yacht);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new yacht
const createYacht = async (req, res) => {
  const {
    name,
    description,
    price,
    capacity,
    availability,
    features,
    location,
    owner,
  } = req.body;
  try {
    const imageUrls = await yachtService.uploadImages(req.files); // Upload images and get URLs
    if (imageUrls.length === 0) {
      throw new Error("At least one image is required");
    }

    const yacht = await yachtService.createYacht(
      name,
      description,
      price,
      capacity,
      availability,
      imageUrls,
      features,
      location,
      owner
    );
    res.status(201).json(yacht);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a yacht by ID
const updateYacht = async (req, res) => {
  try {
    const yacht = await yachtService.updateYacht(req.params.id, req.body);
    res.status(200).json(yacht);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a yacht by ID

const deleteYacht = async (req, res) => {
  try {
    const yacht = await yachtService.deleteYacht(req.params.id);
    res.status(200).json({ message: "Yacht deleted successfully", yacht });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const searchYachts = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const yachts = await yachtService.searchYachts(query);
    res.status(200).json(yachts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getYachts,
  getYachtById,
  createYacht,
  updateYacht,
  deleteYacht,
  searchYachts,
};
