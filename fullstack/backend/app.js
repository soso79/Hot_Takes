

const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();
dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

// Connection à la base de données MongoDB
mongoose.connect((`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`),
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
/* parametrage qui permet l upload de fichiers(images ou autres)*/
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.json());


app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;

