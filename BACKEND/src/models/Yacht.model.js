const mongoose = require("mongoose");


const yachtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true, 
      min: 0, 
    },
    capacity: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true, // Indicates if the yacht is available for rent
    },
    images: [
      {
        type: String, // URLs of yacht images
        required: true,
      },
    ],
    features: [
      {
        type: String, // Specific features like WiFi, AC, etc.
      },
    ],
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the yacht's owner or agent
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Yacht", yachtSchema);
