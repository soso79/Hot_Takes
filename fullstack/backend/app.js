//importation du package dotenv pour utiliser les variables d'environnement
const dotenv = require("dotenv").config();

// importation du package express (création d'application)
const express = require("express");
const app = express();

// importation du package express
const helmet = require("helmet");

// importation du package body-parser
const bodyParser = require("body-parser");

//importation des routes
const saucesRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

// accés au chemin du système de fichiers
const path = require("path");

// importation du package mongoose
const mongoose = require("mongoose");

// connection au cluster mongoDB
mongoose.connect('mongodb+srv://soso:Manimal@cluster0.r62xbdt.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ------------------------------------- //
// middleware
// ------------------------------------- //

// utilisé pour tous types de requêtes //

// headers pour contrôler les erreurs de cors (Cross Origin Resource Sharing), sécurité qui bloque les requêtes http entre 2 serveurs différents
app.use((req, res, next) => {
  // accéder à notre API depuis n'importe quelle origine ( '*' )
  res.setHeader("Access-Control-Allow-Origin", "*");

  // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");

  // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(helmet());

app.use(bodyParser.json());

// importation des routes
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// exportation de l'application
module.exports = app;

