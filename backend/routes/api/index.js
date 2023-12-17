const express = require("express");
const { validateToken } = require("../../middlewares/validate-token.js");
const { connectMongo } = require("../../middlewares/mongo-connect.js");

// Import other API routes
const authRouter = require("./auth");
const usersRouter = require("./users.js");
const roomsRouter = require("./rooms.js");

const router = express.Router();

const allowedPath = ["/login", "/user/register"];

router.use(validateToken(allowedPath));
router.use(connectMongo);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/", authRouter);
router.use("/room", roomsRouter);
router.use("/user", usersRouter);

module.exports = router;
