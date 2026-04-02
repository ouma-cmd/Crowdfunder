const express = require("express");
const valide =require("../utils/joi")


const middlewareRegister = async (req, res, next) => {

    const {name,email,password,balance}=req.body;

  const { err } =valide.validate ({name,email,password,balance});

  if (err) {
     return res.send("err");
  
 }

    next();
  
};

module.exports = middlewareRegister;
