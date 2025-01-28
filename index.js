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
app.get("/delete/:id", async (req, res) => {
  try
  {
    await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
  } 
  catch (error)
  {
    res.status(500).send("Error deleting user");
    console.log(error);
  }
});
app.get("/edit/:id", async (req, res) => {
  try
  {
    const user=await userModel.findOne({_id:req.params.id});
    res.redirect("/edit",{user});
  } 
  catch (error)
  {
    res.status(500).send("Error deleting user");
    console.log(error);
  }
});
app.post("/edit/:id", async (req, res) => {
  try
  {
    const { name, email, image } = req.body;
    await userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true});
    res.redirect("/read");
  } 
  catch (error)
  {
    res.status(500).send("Error deleting user");
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
