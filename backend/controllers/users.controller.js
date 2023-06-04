const express = require("express");
const bcrypt = require("bcrypt");
//import models
const User = require("../models/users.model");

//Create new user
const createNewUser = async (req, res) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    hasJob,
    age,
    email,
    skills,
    disability,
  } = req.body;

  bcrypt.genSalt(10, (err, Salt) => {
    bcrypt.hash(password, Salt, async (err, hash) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }
      try {
        const user = await User.create({
          userName: userName,
          password: hash,
          firstName: firstName,
          lastName: lastName,
          hasJob: hasJob,
          age: age,
          email: email,
          skills: skills,
          disability: disability,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  });
};

//Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

//Get user by username
const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  const user = await User.find({ userName: username });

  if (user.length === 0) {
    return res.status(400).json({ error: "Username does not exist" });
  }
  res.status(200).json(user);
};

//FOR PRACTICE PURPOSES -------------------------------------------------
//Updae user by Username
const updateUserByUsername = async (req, res) => {
  const { username } = req.params;

  const user = await User.find({ userName: username });

  if (user.length === 0) {
    return res.status(400).json({ error: "Username does not exist" });
  }

  const { hasJob } = req.body;

  try {
    const updatedUser = await User.updateOne(
      { userName: username },
      {
        hasJob: hasJob,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserByUsername,
  updateUserByUsername,
};
