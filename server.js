const express = require("express");
const multer = require("multer");
const env = require("./env");
const encrpyt = require("./encript");

const port = env.port;
const app = express();
const upload = multer();

app.set("view engine", "ejs");
app.set("views", "./");

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./src"));
app.use("/styles", express.static("styles"));
app.use("/images", express.static("images"));
app.use("/js", express.static("js"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.render(`${__dirname}/src/html/login.ejs`, { message: `` });
});

app.post("/login", upload.fields([]), async (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";

  if (username === "" || password === "") {
    res.render(`${__dirname}/src/html/register.ejs`, {
      message: `Please enter both username and password`,
    });
    return;
  }
  const encrpytedPassword = await encrpyt.com(password);

  res.redirect(`/login`);
});

app.get("/register", (req, res) => {
  res.render(`${__dirname}/src/html/register.ejs`, { message: `` });
});

app.post("/register", upload.fields([]), async (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";

  if (username === "" || password === "") {
    res.render(`${__dirname}/src/html/register.ejs`, {
      message: `Please enter both username and password`,
    });
    return;
  }
  // TODO: take the username and compare with the database to check duplicates, if so, return the proper message.

  const encrpytedPassword = await encrpyt.encryptPassword(password);
  // TODO: store the has encrpyted password in DB.

  res.redirect(`/login`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
