

const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');





mongoose.connect('mongodb+srv://soso:Manimal@cluster0.r62xbdt.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/*app.use(express.json());*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  

  app.use('/api/hot-takes',stuffRoutes);




module.exports = app;