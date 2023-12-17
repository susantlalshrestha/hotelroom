const express = require("express");
const { Types } = require("mongoose");
const HotelRoom = require("../../models/rooms");

const router = express.Router();

router.get("/all", async (req, res) => {
  const hotelRooms = await HotelRoom.find();
  res.send(JSON.stringify({ data: hotelRooms }));
});

router.get("/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const hotelRoom = await HotelRoom.findById(roomId);
  if (!hotelRoom) {
    return res.status(404).json({ message: "Hotel Room not found" });
  }
  res.send(JSON.stringify({ data: hotelRoom }));
});

router.post("/insert", async (req, res) => {
  const hotelName = req.body.hotelName?.trim();
  if (!hotelName || hotelName === "") {
    return res.status(400).json({ message: "Hotel name cannot be empty!!" });
  }
  const roomNumber = req.body.roomNumber;
  if (!roomNumber || roomNumber <= 0) {
    return res
      .status(400)
      .json({ message: "Room number must be greater than 0!!" });
  }
  const pricePerNight = req.body.pricePerNight;
  if (!pricePerNight || pricePerNight <= 0) {
    return res
      .status(400)
      .json({ message: "Price per night must be greater than 0!!" });
  }
  const bedType = req.body.bedType;
  if (!bedType || bedType === "") {
    return res.status(400).json({ message: "Bed type cannot be empty!!" });
  }
  const amenities = req.body.amenities;
  const view = req.body.view;
  const maxOccupancy = req.body.maxOccupancy;
  if (!maxOccupancy || maxOccupancy <= 0) {
    return res
      .status(400)
      .json({ message: "Maximum Occupancy must be greater than 0!!" });
  }
  const availability = req.body.availability;
  const roomServiceMenu = req.body.roomServiceMenu;
  console.log(req);
  const owner = new Types.ObjectId(req.user.id);

  const newRoom = await HotelRoom.create({
    hotelName,
    roomNumber,
    pricePerNight,
    bedType,
    amenities,
    view,
    maxOccupancy,
    availability,
    roomServiceMenu,
    owner,
  });
  res.send(
    JSON.stringify({
      data: newRoom,
      message: "New hotel room added!",
    })
  );
});

router.post("/update/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  let updatedRoom = await HotelRoom.findByIdAndUpdate(roomId, req.body, {
    new: true,
  });
  if (!updatedRoom) {
    return res.status(404).json({ error: "Hotel room not found" });
  }
  res.send(
    JSON.stringify({ data: updatedRoom, message: "Hotel room updated!!" })
  );
});

router.post("/delete/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  console.log(`Deleting hotel room with ID: ${roomId}`);
  let updatedRoom = await HotelRoom.findByIdAndDelete(roomId);
  if (!updatedRoom) {
    return res.status(404).json({ error: "Hotel room not found" });
  }
  res.send(
    JSON.stringify({ message: "Hotel room deleted!!", data: updatedRoom })
  );
});

module.exports = router;
