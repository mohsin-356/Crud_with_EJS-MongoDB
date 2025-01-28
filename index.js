const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const path = require("path");
const userModel = require("./models/user");

// Connect to MongoDB properly
mongoose.connect("mongodb://localhost:27017/CRUD", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

app.post("/create", async (req, res) => {
  try {
    const { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/read"); // Redirecting after creating a user
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});
app.delete("/delete/:id", async (req, res) => {
  try
  {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/read");
  } 
  catch (error)
  {
    res.status(500).send("Error deleting user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
