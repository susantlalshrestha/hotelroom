const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomID: {
    type: String,
    default: () => mongoose.Types.ObjectId().toString(), // Generate a unique ID
    unique: true,
  },
  hotelName: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  bedType: { type: String, required: true },
  amenities: { type: [String], default: [] },
  view: { type: String },
  maxOccupancy: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  roomServiceMenu: { type: [String], default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const HotelRoom = mongoose.model("rooms", roomSchema);

module.exports = HotelRoom;
