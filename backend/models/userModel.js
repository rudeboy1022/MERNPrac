const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("all field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error("password is not strong enough");
  // }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("email aleady used");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all field must be filled");
  }

  const userInfo = await this.findOne({ email });

  if (!userInfo) {
    throw Error("incorrect Email");
  }

  const match = await bcrypt.compare(password, userInfo.password);

  if (!match) {
    throw Error("password is different");
  }

  return userInfo;
};

module.exports = mongoose.model("User", userSchema);
