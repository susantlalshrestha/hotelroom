const express = require("express");
const axios = require("axios");
const HotelRoom = require("../../models/rooms");
const router = express.Router();

router.get("/", async (req, res) => {
  const accessToken = req.cookies?.access_token;
  if (!accessToken) {
    res.redirect(`/login`);
    return;
  }
  const rooms = await HotelRoom.find();
  res.render(`${__dirname}/../../../frontend/views/dashboard.ejs`, { rooms });
});

router.get("/login", (req, res) => {
  res.render(`${__dirname}/../../../frontend/views/login.ejs`);
});

module.exports = router;
