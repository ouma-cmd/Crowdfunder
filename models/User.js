const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 256,
  },
  role: {
    type: String,
    enum: ["investor", "owner", "admin"],
    default: "investor",
  },
  balance: {
    type: Number,
    required: true,
  },
});

const user = mongoose.model("user", schema);
module.exports = {
  user,
};
