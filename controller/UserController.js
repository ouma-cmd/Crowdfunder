const express = require("express");

const { registerUser , loginUser} = require("../service/userService");


// register
async function registerUserController(req, res) {
  try {
    const registeredUser = await registerUser(req, res); //consemme
    res.json(registeredUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


// login

async  function loginUserController(req,res){
    try {
        const User = await loginUser(req,res)
        res.json(User);
    } catch (error) {
            res.status(500).json(error.message);
    }
}

module.exports = {
  registerUserController,
  loginUserController,
};
