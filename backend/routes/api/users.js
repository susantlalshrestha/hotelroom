const express = require("express");
const { User } = require("../../models/users.js");
const { encryptPassword } = require("../../utils/encript.js");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const userid = req.params.id;
  const user = await User.findById(userid);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { id, fullname, email, role, createdAt, updatedAt } = user;
  res.send(
    JSON.stringify({
      data: { id, fullname, email, role, createdAt, updatedAt },
    })
  );
});

router.post("/register", async (req, res) => {
  const fullname = req.body.fullname || "";
  const email = req.body.email || "";
  const password = req.body.password || "";

  if (fullname === "" || email === "" || password === "") {
    return res.status(400).json({ error: "Please provide all the fields!!" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "User already exists!!" });
  }
  const encryptedPassword = await encryptPassword(password);
  const newUser = User.create({ fullname, email, password: encryptedPassword });
  const { id, role, createdAt, updatedAt } = newUser;
  res.send(
    JSON.stringify({
      data: { id, fullname, email, role, createdAt, updatedAt },
      message: "Registration completed!",
    })
  );
});

router.post("/updateuser/:userid", (req, res) => {
  res.send("API: update User");
});

router.post("/deleteuser/:userid", (req, res) => {
  res.send("API: delete User");
});

module.exports = router;
