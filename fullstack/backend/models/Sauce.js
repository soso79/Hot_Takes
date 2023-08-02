// créer un schéma de données
const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: [true, "userId required"] },
  name: { type: String, required: [true, "name required"] },
  manufacturer: { type: String, required: [true, "manufacturer required"] },
  description: { type: String, required: [true, "description required"] },
  mainPepper: { type: String, required: [true, "mainPepper required"] },
  imageUrl: { type: String, required: [true, "imageUrl required"] },
  heat: { type: Number, required: [true, "heat required"] },
  likes: { type: Number, required: [true, "likes required"] },
  dislikes: { type: Number, required: [true, "dislikes required"] },
  usersLiked: { type: Array, required: [true, "usersLiked required"] },
  usersDisliked: { type: Array, required: [true, "usersDisliked required"] },
});

module.exports = mongoose.model("Sauce", sauceSchema);