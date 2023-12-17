const express = require("express");
const { User } = require("../../models/users.js");
const { comparePassword } = require("../../utils/encript.js");
const { encodeToken } = require("../../utils/token-helper.js");

const router = express.Router();

router.post("/login", async (req, res) => {
  const email = req.body.email || "";
  const password = req.body.password || "";
  if (email === "" || password === "") {
    return res.status(400).json({ error: "Please provide all the fields!!" });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!!" });
  const passwordMatched = await comparePassword(password, user.password);
  if (!passwordMatched)
    return res.status(400).json({ error: "Incorrect username and password!!" });
  const { id, fullname, role, createdAt, updatedAt } = user;
  const loggedUser = { id, fullname, email, role, createdAt, updatedAt };
  const accessToken = encodeToken(loggedUser, "access", { jwtid: id });
  res.cookie("access_token", accessToken, {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
  });
  res.send(JSON.stringify({ data: loggedUser, token: accessToken }));
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.send({ message: "Signed out!!" });
});

module.exports = router;
