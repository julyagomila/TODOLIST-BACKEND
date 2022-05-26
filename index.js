const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const formidable = require("express-formidable");
app.use(formidable());
// const axios = require("axios");

require("dotenv").config();

// Connexion à la BDD :
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

//import des routes
const taskRoutes = require("./routes/tasks");
app.use(taskRoutes);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !"); // POUR LES ROUTES INEXISTANTES
});

app.listen(process.env.PORT, () => {
  console.log("Server has started ! ");
});
