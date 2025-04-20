const Yacht = require("../models/Yacht.model");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Fetch Agent yachts
const getYachtsByOwner = async (ownerId) => {
  return await Yacht.find({owner: ownerId});
};

// Fetch a specific yacht by ID
const getYachtById = async (id) => {
  const yacht = await Yacht.findById(id);
  if (!yacht) {
    throw new Error("Yacht not found");
  }
  return yacht;
};

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Upload images to Cloudinary
const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload");
  }
  const uploadPromises = files.map((file) => {
    return cloudinary.uploader.upload(file.path, { folder: "user_images" });
  });
  const results = await Promise.all(uploadPromises);
  return results.map((result) => result.secure_url);
};

// Create a new yacht
const createYacht = async (
  name,
  description,
  price,
  capacity,
  availability,
  imageUrls,
  features,
  location,
  owner
) => {
  const yacht = new Yacht({
    name,
    description,
    price,
    capacity,
    availability,
    images: imageUrls,
    features,
    location,
    owner,
  });
  return await yacht.save();
};

// Update a yacht by ID
const updateYacht = async (id, updateData) => {
  const yacht = await Yacht.findByIdAndUpdate(id, updateData, { new: true });
  if (!yacht) {
    throw new Error("Yacht not found");
  }
  return yacht;
};

// Delete a yacht by ID
const deleteYacht = async (id) => {
  const yacht = await Yacht.findByIdAndDelete(id);
  if (!yacht) {
    throw new Error("Yacht not found");
  }
  return yacht;
};

const searchYachts = async (query) => {
  try {
    const results = await Yacht.aggregate([
      {
        $search: {
          index: "default", // or your custom index name
          text: {
            query: query,
            path: ["name", "description", "features", "location"], // fields to search
          },
        },
      },
      {
        $limit: 20, // limit results
      },
    ]);

    return results;
  } catch (error) {
    throw new Error("Error searching yachts");
  }
};

module.exports = {
  getYachtsByOwner,
  getYachtById,
  uploadImages,
  createYacht,
  updateYacht,
  deleteYacht,
  searchYachts,
};
