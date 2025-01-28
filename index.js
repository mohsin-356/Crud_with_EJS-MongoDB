const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userModel = require("./models/user");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", async (req, res) => {
  let users =await userModel.find();
  res.render("read", { users });
});
app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  // Add data to MongoDB here
  const createdUser = await userModel.create({ name, email, image });
  // return;
  // res.send(createdUser);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
