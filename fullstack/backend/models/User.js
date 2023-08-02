const mongoose = require("mongoose");

// méthode mongoose-unique-validator pour s'assurer que 2 utilisateurs différents n'utilisent pas la même adresse
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "email required"], unique: [true, "email already exist"] },
  password: { type: String, required: [true, "password required"] },
});

// ajout de la methode avant exportation
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);