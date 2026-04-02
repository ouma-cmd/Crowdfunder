const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config;

const connect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("connected");
  } catch {
    console.log("is not connected");
  }
};
module.exports = connect;
