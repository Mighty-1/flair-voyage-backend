const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, requird: true, unique: true },
  password: { type: String, required: true },
  isAgent: { type: Boolean, default: false },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Yacht" }],
}, {timestamps: true});


// Encrypt password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', userSchema);