const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "OWNER", "CUSTOMER"],
    default: "CUSTOMER",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = { User };
