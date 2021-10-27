const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
require("./db/conn");
const User = require("./models/userSchema");

const staticPath = path.join(__dirname, "./public");
const templatePath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

app.use(
  "/css",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "./node_modules/jquery/dist"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;
    if (!name || !email || !phone || !address || !message) {
      res.status(401).send("plz.. fill the data");
    } else {
      const userData = new User(req.body);
      await userData.save();
      res.status(201).render("index");
      res.status(201).json({ message: "User created successfully..." });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server started on Port : ${port}`);
});
