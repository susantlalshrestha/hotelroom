require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./");

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("./frontend/assets/images"));
app.use("/css", express.static("frontend/assets/styles"));
app.use("/js", express.static("frontend/js"));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false }));

// Import routers
const apiRouter = require("./backend/routes/api");
const webRouter = require("./backend/routes/web");

// Mount routers
app.use("/api", apiRouter);
app.use("/", webRouter);

app.use((req, res, next) => {
  res.render(`${__dirname}/frontend/views/404.ejs`);
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
