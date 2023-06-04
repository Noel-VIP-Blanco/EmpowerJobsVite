const express = require('express')
const bcrypt = require('bcrypt')
//import models
const User = require('../models/users.model')

//function used to compare to password
const comparePassword = async (plainPassword, hashPassword) => {
    try{
        return await bcrypt.compare(plainPassword, hashPassword)
    }catch(error){
        throw error
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ userName: username });
      if (user) {
        const isMatchedPassword = await comparePassword(password, user.password);
        if (isMatchedPassword) {
          res.json(user);
        } else {
          res.status(401).json({ error: "Invalid username or password" });
        }
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {
    loginUser
}