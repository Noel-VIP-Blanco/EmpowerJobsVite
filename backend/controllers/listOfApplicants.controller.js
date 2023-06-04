const express = require("express");
//import models
const ListOfApplicants = require("../models/listOfApplicants.model");

//
const createApplicants = async (req, res) => {
  const { jobName, userName, skills, disability } = req.body;
  try {
    const listOfApplicants = await ListOfApplicants.create({
      jobName,
      userName,
      skills,
      disability,
    });
    res.status(200).json(listOfApplicants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Get all Applicants
const getAllApplicants = async (req, res) => {
  const listOfApplicants = await ListOfApplicants.find({});
  res.status(200).json(listOfApplicants);
};

const deleteApplicantsAfterAccepted = async (req, res) => {
  const { userName } = req.query;
  try {
    // Find users based on the specified condition
    const usersToDelete = await ListOfApplicants.find({ userName: userName });

    if (usersToDelete.length === 0) {
      res.status(404).json({ message: `No users found` });
    }

    // Delete the users
    await ListOfApplicants.deleteMany({
      userName: userName,
    });

    res.json({ message: `Users deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createApplicants,
  getAllApplicants,
  deleteApplicantsAfterAccepted,
};
