const mongoose = require("mongoose");


const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "email required"], unique: [true, "email already exist"] },
  password: { type: String, required: [true, "password required"] },
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);