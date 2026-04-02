const express = require("express");

const hashPassword = require("../utils/hachPassword");
const { user } = require("../models/user");
const { error } = require("../utils/joi");
const { signeToken, viryfieToken } = require("../utils/jwtToken");

const bcrypt = require("bcryptjs");

// register
const registerUser = async (req, res) => {
  const { name, email, password, balance, role } = req.body;

  const userEmail = await user.findOne({ email });
  if (userEmail) {
    console.log("email kayen ");
    throw new Error("deja execest email");
  }

  const passwordd = await hashPassword(password);

  const newuser = await user.create({
    name,
    email,
    password: passwordd,
    balance,
    role,
  });

  return newuser;
};

// login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginUser = await user.findOne({ email });

    console.log(loginUser);

    if (!loginUser) {
      throw new Error("user not find !");
    }

    const pass = await bcrypt.compare(password, loginUser.password);

    if (!pass) {
      throw new Error("password is not correcte ! ");
    }

    const { _id, role } = loginUser;

    const token = signeToken({ _id, role });

    return {
      loginUser,
      token,
    };
  } catch (err) {
    console.log("error");
    throw err;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
